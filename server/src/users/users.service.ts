import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);
    await this.usersRepository.save(createUserDto);
    return newUser;
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(username: string): Promise<UserEntity | undefined> {
    const user = await this.usersRepository.findOne({
      where: { username: username },
    });
    if(user) {
      return user;
    }
    return null;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne({
      where: { user_id: id },
    });
    if(!user) {
      return null;
    }
    await this.usersRepository.remove(user);
    return user;
  }
}
