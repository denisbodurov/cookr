import {
  IsString,
  IsEmail,
  MinLength,
  Matches,
  IsNotEmpty,
} from 'class-validator';
export class CreateUserDto {
  @IsEmail({}, { message: 'invalid-email-format' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'password-too-short' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'invalid-password-format',
  })
  password: string;

  @IsString({ message: 'invalid-username-format' })
  @IsNotEmpty({ message: 'invalid-username-format' })
  username: string;

  @IsString({ message: 'invalid-first_name-format' })
  @IsNotEmpty({ message: 'invalid-first_name-format' })
  first_name: string;

  @IsString({ message: 'invalid-last_name-format' })
  @IsNotEmpty({ message: 'invalid-last_name-format' })
  last_name: string;
}
