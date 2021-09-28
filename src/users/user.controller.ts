import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { addUser } from './user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  addUser(@Body('addUser') addUser: addUser) {
    const {
      userName,
      password,
      phoneNumber,
      email,
      surName,
      name,
      dateOfBirth,
      placeOfBirth,
      gender,
      ethenicType,
      address,
      roleID,
    } = addUser;
    const generatedID = this.usersService.insertUser(
      userName,
      password,
      phoneNumber,
      email,
      surName,
      name,
      dateOfBirth,
      placeOfBirth,
      gender,
      ethenicType,
      address,
      roleID,
    );
    return { id: generatedID };
  }

  @Get()
  getAllUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getProducts(@Param('id') userID: string) {
    return this.usersService.getUserByID(userID);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') userID: string,
    @Body('userName') userName: string,
    @Body('password') password: string,
    @Body('phoneNumber') phoneNumber: number,
    @Body('email') email: string,
    @Body('surName') surName: string,
    @Body('name') name: string,
    @Body('dateOfBirth') dateOfBirth: Date,
    @Body('placeOfBirth') placeOfBirth: string,
    @Body('gender') gender: string,
    @Body('ethenicType') ethenicType: string,
    @Body('address') address: string,
    @Body('roleID') roleID: string,
  ) {
    this.usersService.updateProduct(
      userID,
      userName,
      password,
      phoneNumber,
      email,
      surName,
      name,
      dateOfBirth,
      placeOfBirth,
      gender,
      ethenicType,
      address,
      roleID,
    );
    return { success: true };
  }
}
