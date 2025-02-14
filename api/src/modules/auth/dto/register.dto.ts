import { IsEmail, IsString } from 'src/common/validation';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}
