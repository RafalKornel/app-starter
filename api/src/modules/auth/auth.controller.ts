import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
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
import { IMailerService } from 'src/shared/modules/mailer/interfaces/mailer-service.interface';
import { MailerFacade } from 'src/shared/modules/mailer/mailer.facade';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailerFacade: MailerFacade,
  ) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token } = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );

    res.cookie('accessToken', access_token, {
      expires: new Date(new Date().getTime() + 60 * 1000),
      sameSite: 'strict',
      httpOnly: true,
      secure: true,
    });

    return { access_token };
  }

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(AuthGuard)
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
