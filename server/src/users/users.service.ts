import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/authenticate-user.dto';
import * as argon2 from 'argon2';
import { User } from './decorators/user.decorator';
import { TokenPayload } from 'src/auth/models/token.model';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async getUserById(userId: number): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: { user_id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async signUp(createUserDto: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.usersRepository.findOne({
      where: [
        { email: createUserDto.email },
        { username: createUserDto.username },
      ],
    });

    if (existingUser) {
      if (existingUser.email === createUserDto.email) {
        throw new ConflictException('Email is already taken');
      } else {
        throw new ConflictException('Username is already taken');
      }
    }

    const newUser = this.usersRepository.create(createUserDto);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async signIn(loginDto: LoginDto): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: { email: loginDto.email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await argon2.verify(
      user.password,
      loginDto.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async updateProfile(
    @User() user: TokenPayload,
    updateUserDto: UpdateUserDto,
  ) {
    const result = await this.usersRepository.update(
      { user_id: user.sub },
      updateUserDto,
    );

    if (result.affected === 0) {
      throw new NotFoundException('User not found or no changes made');
    }

    const updatedUser = await this.usersRepository.findOne({
      where: { user_id: user.sub },
    });

    if (!updatedUser) {
      throw new NotFoundException('User not found after update');
    }

    return updatedUser;
  }
}
