import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import * as bcrypt from 'bcrypt';
import { EntityManager } from 'typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { AuthEntity } from 'src/database/entities/auth.entity';

@Injectable()
export class AuthService {
  private static SALT_ROUNDS = 10;

  constructor(
    private readonly jwtService: JwtService,
    private readonly entityManager: EntityManager,
  ) {}

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

    const payload: JwtPayload = { sub: user.id, username: user.username };

    const access_token = await this.jwtService.signAsync(payload);

    return { access_token };
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
}
