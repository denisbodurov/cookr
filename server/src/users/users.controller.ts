import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/authenticate-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // signUp(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.signUp(createUserDto);
  // }

  // @Post()
  // signIn(@Body() loginDto: LoginDto) {
  //   return this.usersService.signIn(loginDto);
  // }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findById(id);
  }
  

}
