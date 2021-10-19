import { student } from './../NonModule/interface/student.interface';
import { studentClass } from '../NonModule/interface/studentClass.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../NonModule/entity/User.entity';
import { StudentEntity } from '../NonModule/entity/Student.entity';
import { user } from '../NonModule/interface/user.interface';
import { Repository } from 'typeorm';
import { Console, log } from 'console';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(StudentEntity)
    private studentsRepository: Repository<StudentEntity>,
  ) { }

  async registerStudent(account: user): Promise<user> {
    await this.usersRepository.save(account);
    await this.studentsRepository.save({
      idUser: account.id,
      isPaid: false,
      // classId: [],
    });
    return account;
  }

  allUser(): Promise<user[]> {
    return this.usersRepository.find();
  }

  allStudent(): Promise<student[]> {
    return this.studentsRepository.find();
  }
  async findOne(username: string): Promise<user | undefined> {
    return this.usersRepository.findOne({
      where: {
        userName: username
      }
    });
  }

  async deleteUserByID(userID:number){
    await this.usersRepository.delete({ id: userID });
  }
  
  // async login(): Promise<user> {
  //   const data = await this.usersRepository.findOne({ id: 2 });
  //   console.log(data);
  //   return data;
  // }
}
