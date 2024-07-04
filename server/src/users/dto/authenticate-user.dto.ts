import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'invalid-email-format' })
  email: string;

  @IsString()
  password: string;
}
