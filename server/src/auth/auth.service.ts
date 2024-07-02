import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any): Promise<{ access_token: string }> {
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: any): Promise<{ access_token: string }> {
    const existingUser = await this.usersService.findOne(user.username);
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const newUser = await this.usersService.create(user);

    const payload = { sub: newUser.user_id, username: newUser.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
