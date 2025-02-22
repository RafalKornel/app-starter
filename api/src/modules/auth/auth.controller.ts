import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { RegisterDto } from './dto/register.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { Public } from './decorators/public.decorator';
import { MailerFacade } from 'src/shared/modules/mailer/mailer.facade';
import { EnvironmentConfig } from 'src/config/config.types';
import { RefreshTokenRevokedError } from './errors/refresh-token-revoked.error';
import { UserEntity } from 'src/database/entities/user.entity';
import { ProfileFactory } from './factories/profile.factory';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailerFacade: MailerFacade,
    private readonly config: EnvironmentConfig,
  ) {}

  @Public()
  @Post('login')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken, user } = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );

    res.cookie(this.config.REFRESH_COOKIE, refreshToken, {
      expires: new Date(
        new Date().getTime() + this.config.JWT_REFRESH_TIME * 1000,
      ),
      sameSite: 'strict',
      httpOnly: true,
      secure: true,
    });

    const profile = ProfileFactory.userToProfileDto(user);

    return { accessToken, profile };
  }

  @Post('logout')
  async logOut(
    @CurrentUser() user: UserEntity,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logout(user.id);

    res.clearCookie(this.config.REFRESH_COOKIE);
  }

  @Public()
  @Post('refresh-access-token')
  async refreshAccessToken(@Req() req: Request) {
    const refreshToken = req.cookies['refreshToken'];

    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    try {
      const accessToken =
        await this.authService.refreshAccessToken(refreshToken);

      return { accessToken };
    } catch (e) {
      if (e instanceof RefreshTokenRevokedError) {
        throw new UnauthorizedException();
      }
    }
  }

  @Public()
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Get('profile')
  async getProfile(@CurrentUser() user: UserEntity) {
    return ProfileFactory.userToProfileDto(user);
  }

  @Public()
  @Post('test-email')
  async sendTestEmail() {
    await this.mailerFacade.sendMail({
      recepientEmail: 'email@example.com',
      subject: 'test subject',
      text: 'text',
    });
  }
}
