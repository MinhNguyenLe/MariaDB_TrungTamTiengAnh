import { student } from './../NonModule/interface/student.interface';
import { studentClass } from '../NonModule/interface/studentClass.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../NonModule/entity/User.entity';
import { StudentEntity } from '../NonModule/entity/Student.entity';
import { user } from '../NonModule/interface/user.interface';
import { Repository } from 'typeorm';
import { Console, log } from 'console';
import * as bcrypt from 'bcrypt';
import { RoleEntity } from 'src/NonModule/entity/Role.entity';
import { TeacherEntity } from 'src/NonModule/entity/Teacher.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(StudentEntity)
    private studentsRepository: Repository<StudentEntity>,
    @InjectRepository(TeacherEntity)
    private teacherRepository: Repository<TeacherEntity>,
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

  async registerStudent(account: user): Promise<user> {
    const salt = await bcrypt.genSalt();
    account.password = await bcrypt.hash(account.password, salt);
    const user = await this.usersRepository.save(account);
    await this.studentsRepository.save({
      user: user,
    });
    return account;
  }

  allUser(): Promise<user[]> {
    return this.usersRepository.find();
  }

  async findOne(username: string): Promise<user | undefined> {
    return this.usersRepository.findOne({
      where: {
        userName: username,
      },
    });
  }

  async deleteUserByID(userID: number) {
    await this.usersRepository.delete({ id: userID });
  }

  async clearRepo(): Promise<user[]> {
    await this.usersRepository.clear();
    return this.usersRepository.find();
  }
}
