import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { studentClass } from './user.interface';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAllUser() {
    return this.usersService.allUser();
  }

  @Get('/students')
  findAllStudent() {
    return this.usersService.allStudent();
  }

  @Post('/register')
  register(@Body('account') account: studentClass) {
    return this.usersService.registerStudent(account);
  }
}
