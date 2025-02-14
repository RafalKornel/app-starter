import { IsEmail, IsString } from 'src/common/validation';

export class SignInDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
