import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/users/dto/authenticate-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.signIn(loginDto);

    const payload = { sub: user.user_id, username: user.username };
    return {
      user: user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(
    createUserDto: CreateUserDto,
  ) {
    const user = await this.usersService.signUp(createUserDto);

    const payload = { sub: user.user_id, username: user.username };
    return {
      user: user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
