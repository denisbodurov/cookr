import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/authenticate-user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  async findById(id: number): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: { user_id: id },
    });
    if (user) {
      return user;
    }
    throw new BadRequestException('user-not-found');
  }

  async signUp(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOne({
      where: [
        { email: createUserDto.email },
        { username: createUserDto.username },
      ],
    });

    if (existingUser) {
      if (existingUser.email === createUserDto.email) {
        throw new BadRequestException('email-taken');
      } else {
        throw new BadRequestException('username-taken');
      }
    }

    const newUser = this.usersRepository.create(createUserDto);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async signIn(loginDto: LoginDto) {
    const user = await this.usersRepository.findOne({
      where: { email: loginDto.email },
    });
    if (user) {
      const isPasswordValid = await argon2.verify(
        user.password,
        loginDto.password,
      );
      if (isPasswordValid) {
        return user;
      }
    }
    throw new BadRequestException('invalid-credentials');
  }
}
