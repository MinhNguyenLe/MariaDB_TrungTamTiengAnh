import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { StudentEntity } from './student.entity';
import { user, studentClass } from './user.interface';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(StudentEntity)
    private studentsRepository: Repository<StudentEntity>,
  ) {}

  async registerStudent(account: studentClass): Promise<studentClass> {
    await this.usersRepository.save(account);
    await this.studentsRepository.save({
      idUser: account.id,
      isPaid: false,
      // classId: [],
    });
    return account;
  }

  all(): Promise<user[]> {
    return this.usersRepository.find();
  }
  // async login(): Promise<user> {
  //   const data = await this.usersRepository.findOne({ id: 2 });
  //   console.log(data);
  //   return data;
  // }
}
