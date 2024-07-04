import { Body, ClassSerializerInterceptor, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/users/dto/authenticate-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
    constructor(private authService: AuthService) {}


    @Post('/login')
    async login(@Body() user: LoginDto) {
      return this.authService.login(user);
    }

    @Post('/register')
    async register(@Body() user: CreateUserDto) {
      return this.authService.register(user);
    }
}
