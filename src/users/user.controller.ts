import customStatusCode from './../NonModule/customStatusCode/index';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { studentClass } from '../NonModule/interface/studentClass.interface';
import { register } from 'src/NonModule/interface/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAllUser() {
    return this.usersService.allUser();
  }

  @Get('/student')
  getAllStudent() {
    return this.usersService.getAllStudent();
  }

  @Post('/code-class')
  getCodeClass(@Body('role') role: string, @Body('idUser') idUser: number) {
    return this.usersService.getCodeClass(role, idUser);
  }

  @Get('/teacher')
  getAllTeacher() {
    return this.usersService.getAllTeacher();
  }

  @Get('/admin')
  getAllAdmin() {
    return this.usersService.getAllAdmin();
  }

  @Delete()
  deleteUserById(@Body('id') id: number) {
    return this.usersService.deleteUserByID(id);
  }

  @Post('/register')
  register(@Body('account') account: register) {
    console.log(account);
    if (!account.userName) {
      customStatusCode('INTERNAL_SERVER_ERROR', 'user name not found');
    }
    if (!account.email) {
      customStatusCode('INTERNAL_SERVER_ERROR', 'email not found');
    }
    if (!account.address) {
      customStatusCode('INTERNAL_SERVER_ERROR', 'address not found');
    }
    return this.usersService.register(account);
  }

  @Delete()
  clearRepo() {
    return this.usersService.clearRepo();
  }
}
