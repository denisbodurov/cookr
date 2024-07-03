import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/users/dto/authenticate-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(ThrottlerGuard)
    @Post('/login')
    async login(@Body() user: LoginDto) {
      return this.authService.login(user);
    }

    @UseGuards(ThrottlerGuard)
    @Post('/register')
    async register(@Body() user: CreateUserDto) {
      return this.authService.register(user);
    }
}
