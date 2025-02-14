import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async signIn(email: string, password: string) {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Email or password incorrect.');
    }

    const isPasswordMatching = user.password === password;

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Email or password incorrect.');
    }

    const payload: JwtPayload = { sub: user.id, username: user.username };

    const access_token = await this.jwtService.signAsync(payload);

    return { access_token };
  }

  public async register(registerDto: RegisterDto) {
    return await this.usersService.registerUser(
      registerDto.email,
      registerDto.password,
      registerDto.username,
    );
  }
}
