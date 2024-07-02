import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/users/dto/authenticate-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.usersService.signIn(loginDto);
    
    const payload = { sub: user.user_id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto): Promise<{ access_token: string }> {
    const newUser = await this.usersService.signUp(createUserDto);

    const payload = { sub: newUser.user_id, username: newUser.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
