import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import * as bcrypt from 'bcrypt';
import { EntityManager } from 'typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { AuthEntity } from 'src/database/entities/auth.entity';
import { EnvironmentConfig } from 'src/config/config.types';
import { randomUUID, UUID } from 'crypto';
import { RefreshTokenRevokedError } from './errors/refresh-token-revoked.error';

type RefreshTokenJWTPayload = JwtPayload & { refreshTokenUuid: string };

@Injectable()
export class AuthService {
  private static SALT_ROUNDS = 10;

  constructor(
    private readonly jwtService: JwtService,
    private readonly config: EnvironmentConfig,
    private readonly entityManager: EntityManager,
  ) {}

  public async getProfile(id: number) {
    return await this.entityManager.findOneBy(UserEntity, { id });
  }

  public async signIn(email: string, password: string) {
    const user = await this.entityManager.getRepository(UserEntity).findOne({
      where: { email },
      relations: { auth: true },
    });

    if (!user) {
      throw new UnauthorizedException('Email or password incorrect.');
    }

    const isPasswordMatching = await this.comparePassword(
      password,
      user.auth.passwordHash,
    );

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Email or password incorrect.');
    }

    const accessToken = await this.signAccessToken({
      sub: user.id,
      username: user.username,
    });

    const refreshTokenUuid = randomUUID();
    const refreshToken = await this.signRefreshToken({
      sub: user.id,
      username: user.username,
      refreshTokenUuid,
    });

    user.auth.activeRefreshTokenUuid = refreshTokenUuid;

    await this.entityManager.getRepository(AuthEntity).save(user.auth);

    return { accessToken, refreshToken, user };
  }

  public async logout(userId: number) {
    const user = await this.entityManager.getRepository(UserEntity).findOne({
      where: { id: userId },
      relations: { auth: true },
    });

    if (!user) {
      throw new Error('Could not find user with given id.');
    }

    if (!user.auth.activeRefreshTokenUuid) {
      throw new Error('User is not logged in.');
    }

    user.auth.activeRefreshTokenUuid = null;

    await this.entityManager.getRepository(AuthEntity).save(user.auth);
  }

  public async refreshAccessToken(refreshToken: string) {
    const { refreshTokenUuid, sub, username } =
      await this.verifyRefreshToken(refreshToken);

    const auth = await this.entityManager
      .getRepository(AuthEntity)
      .findOne({ where: { activeRefreshTokenUuid: refreshTokenUuid } });

    if (!auth) {
      throw new RefreshTokenRevokedError();
    }

    const accessToken = await this.signAccessToken({ sub, username });

    return accessToken;
  }

  public async revokeToken(tokenId: UUID) {
    const auth = await this.entityManager
      .getRepository(AuthEntity)
      .findOne({ where: { activeRefreshTokenUuid: tokenId } });

    if (!auth) {
      throw new Error('Token id invalid.');
    }

    auth.activeRefreshTokenUuid = null;

    await this.entityManager.getRepository(AuthEntity).save(auth);
  }

  public async register(registerDto: RegisterDto) {
    const hashedPassword = await this.hashPassword(registerDto.password);

    const user = new UserEntity();
    user.email = registerDto.email;
    user.username = registerDto.username;

    const auth = new AuthEntity();
    auth.passwordHash = hashedPassword;

    await this.entityManager.transaction(async (em) => {
      const userRepository = em.getRepository(UserEntity);
      const authRepository = em.getRepository(AuthEntity);

      await userRepository.save(user);

      auth.user = user;
      await authRepository.save(auth);
    });

    return { username: user.username, email: user.email };
  }

  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(AuthService.SALT_ROUNDS);

    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }

  private async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  private async signAccessToken(payload: JwtPayload) {
    return await this.jwtService.signAsync(payload);
  }

  private async signRefreshToken(payload: RefreshTokenJWTPayload) {
    return await this.jwtService.signAsync(payload, {
      expiresIn: this.config.JWT_REFRESH_TIME,
    });
  }

  private async verifyRefreshToken(
    token: string,
  ): Promise<RefreshTokenJWTPayload> {
    return await this.jwtService.verifyAsync(token, {
      secret: this.config.JWT_ACCESS_SECRET,
    });
  }
}
