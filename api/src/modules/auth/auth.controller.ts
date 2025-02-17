import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from './guards/auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Public } from './decorators/public.decorator';
import { MailerFacade } from 'src/shared/modules/mailer/mailer.facade';
import { EnvironmentConfig } from 'src/config/config.types';
import { RefreshTokenRevokedError } from './errors/refresh-token-revoked.error';

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
    const { accessToken, refreshToken } = await this.authService.signIn(
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

    return { accessToken };
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
  async getProfile(@CurrentUser() user: JwtPayload, @Req() req: Request) {
    return user;
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
