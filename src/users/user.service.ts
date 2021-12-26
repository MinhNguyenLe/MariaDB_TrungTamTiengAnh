import { editTeacher } from './../NonModule/interface/user.interface';
import { student } from './../NonModule/interface/student.interface';
import { studentClass } from '../NonModule/interface/studentClass.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../NonModule/entity/User.entity';
import { StudentEntity } from '../NonModule/entity/Student.entity';
import { user, register, registerTeacher, editStudent } from '../NonModule/interface/user.interface';
import { Repository } from 'typeorm';
import { Console, log } from 'console';
import * as bcrypt from 'bcrypt';
import { TeacherEntity } from 'src/NonModule/entity/Teacher.entity';
import { teacher } from 'src/NonModule/interface/teacher.interface';
import { AdminEntity } from 'src/NonModule/entity/Admin.entity';
import { admin } from 'src/NonModule/interface/admin.interface';
import customStatusCode from 'src/NonModule/customStatusCode';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(StudentEntity)
    private studentsRepository: Repository<StudentEntity>,
    @InjectRepository(TeacherEntity)
    private teacherRepository: Repository<TeacherEntity>,
    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
  ) {}

  async register(account: register): Promise<user> {
    const salt = await bcrypt.genSalt();
    account.password = await bcrypt.hash(account.password, salt);
    const user = await this.usersRepository.save(account);
    if (account.permission === 3) {
      await this.studentsRepository.save({
        user: user,
      });
    }
    if (account.permission === 2) {
      await this.teacherRepository.save({
        user: user,
      });
    }
    if (account.permission === 1) {
      await this.adminRepository.save({
        user: user,
      });
    }
    return user;
  }

  async registerTeacher(account:  registerTeacher): Promise<teacher[]> {
    const salt = await bcrypt.genSalt();
    account.password = await bcrypt.hash(account.password, salt);
    const user = await this.usersRepository.save(account);
    await this.teacherRepository.save({
      user: user,
    });
    return this.teacherRepository.find({ relations: [ 'user',
    'teacherClass',
    'teacherClass.classes',
    'schedule',
    'schedule.timetable',] });
  }

  async getAllStudent(): Promise<student[]> {
    return this.studentsRepository.find({
      relations: [
        'user',
        'studentClass',
        'studentClass.classes',
        'schedule',
        'schedule.timetable',
      ],
    });
  }

  async getAllTeacher(): Promise<teacher[]> {
    return this.teacherRepository.find({ relations: ['user', 'teacherClass'] });
  }

  async getAllAdmin(): Promise<admin[]> {
    return this.adminRepository.find({ relations: ['user'] });
  }

  async getCodeClass(role: string, idUser: number): Promise<string[]> {
    const user = await this.usersRepository.findOne({
      where: {
        id: idUser,
      },
    });
    const code = [];

    if (role === 'student') {
      const student = await this.studentsRepository.findOne({
        where: {
          user: user,
        },
        relations: ['studentClass', 'studentClass.classes'],
      });
      console.log('-------------------', student, '----------------');
      student.studentClass.forEach((item) => {
        code.push(item.classes.code);
      });
    } 
     else if (role === 'teacher') {
      const teacher = await this.teacherRepository.findOne({
        where: {
          user: user,
        },
        relations: ['teacherClass', 'teacherClass.classes'],
      });
      console.log('-------------------', teacher, '----------------');
      teacher.teacherClass.forEach((item) => {
        code.push(item.classes.code);
      });
    } 
    else {
      customStatusCode('INTERNAL_SERVER_ERROR', 'role is student or teacher');
    }

    return code;
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

  async editStudent(account: editStudent): Promise<student> {
    const user = await this.usersRepository.findOne({
      where: {
        id: account.id
      },
    });
    await this.studentsRepository.update(
      { user},
      {
        education: account.education,
        level: account.level
      },
    );
    await this.usersRepository.update(
      { id: account.id},
      {
        lastName: account.lastName,
        firstName: account.firstName,
        placeBirth: account.placeBirth,
        dateBirth: account.dateBirth,
        phoneNumber: account.phoneNumber,
        address: account.address,
      },
    );
    return this.studentsRepository.findOne({
      where: { user },
      relations: [
        'user',
        'studentClass',
        'studentClass.classes',
        'studentClass.classes.noti',
        'studentClass.classes.course',
        'studentClass.classes.teacherClass',
        'studentClass.classes.teacherClass.teacher',
        'studentClass.classes.teacherClass.teacher.user',
        'studentClass.classes.timetable',
        'studentClass.classes.timetable.classroom',
        'schedule',
        'schedule.timetable',
      ],
    });
  }

  async editTeacher(account: editTeacher): Promise<teacher> {
    const user = await this.usersRepository.findOne({
      where: {
        id: account.id
      },
    });
    await this.teacherRepository.update(
      { user},
      {
        certificate: account.certificate,
        level: account.level
      },
    );
    await this.usersRepository.update(
      { id: account.id},
      {
        lastName: account.lastName,
        firstName: account.firstName,
        placeBirth: account.placeBirth,
        dateBirth: account.dateBirth,
        phoneNumber: account.phoneNumber,
        address: account.address,
      },
    );
    return this.teacherRepository.findOne({
      where: { user },
      relations: [
        'user',
        'teacherClass',
        'teacherClass.classes',
        'teacherClass.classes.noti',
        'teacherClass.classes.course',
        'teacherClass.classes.studentClass',
        'teacherClass.classes.studentClass.student',
        'teacherClass.classes.studentClass.student.user',
        'teacherClass.classes.timetable',
        'teacherClass.classes.timetable.classroom',
        'schedule',
        'schedule.timetable',
      ],
    });
  }

  async deleteUserByID(userID: number) {
    await this.usersRepository.delete({ id: userID });
  }

  async deleteStudentByID(id: number):Promise<student[]> {
    await this.studentsRepository.delete({ id });
    return this.studentsRepository.find({
       relations: [
        'user',
        'studentClass',
        'studentClass.classes',
        'schedule',
        'schedule.timetable',
      ],
    })
  }

  async deleteTeacherByID(id: number):Promise<teacher[]> {
    await this.teacherRepository.delete({ id });
    return this.teacherRepository.find({
       relations: [
        'user',
        'teacherClass',
        'teacherClass.classes',
        'schedule',
        'schedule.timetable',
      ],
    })
  }

  async clearRepo(): Promise<user[]> {
    await this.usersRepository.clear();
    return this.usersRepository.find();
  }
}
