import {
  IsEmail,
  IsNumber,
  IsOptionalString,
  IsString,
} from 'src/common/validation';

export class ProfileDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsOptionalString()
  avatar: string;
}
