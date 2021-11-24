import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from 'src/NonModule/entity/Admin.entity';
import { StudentEntity } from 'src/NonModule/entity/Student.entity';
import { TeacherEntity } from 'src/NonModule/entity/Teacher.entity';
import { Repository } from 'typeorm';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(StudentEntity)
    private studentsRepository: Repository<StudentEntity>,
    @InjectRepository(TeacherEntity)
    private teacherRepository: Repository<TeacherEntity>,
    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
    private jwtService: JwtService,
  ) {}

  async validateUser(userName: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(userName);
    console.log(user.nameRole);
    const isMatch = await bcrypt.compare(pass, user.password);
    console.log('compare: ' + isMatch);
    if (user && isMatch) {
      if (user.nameRole === 'student') {
        return this.studentsRepository.findOne({
          where: { user },
          relations: [
            'user',
            'studentClass',
            'studentClass.classes',
            'schedule',
            'schedule.timetable',
          ],
        });
      } else if (user.nameRole === 'teacher') {
        return this.teacherRepository.findOne({
          where: { user },
          relations: [
            'user',
            'teacherClass',
            'teacherClass.classes',
            'schedule',
            'schedule.timetable',
          ],
        });
      } else {
        return this.adminRepository.findOne({
          where: { user },
          relations: ['user'],
        });
      }
      // const { password, ...result } = user;
      // log('validateUser: ' + JSON.stringify(result));
      // return result;
    }
    throw new NotFoundException('Authentication failed!');
  }

  async login(user: any) {
    const payload = { user };
    return {
      access_token: this.jwtService.sign(payload),
      account: user,
    };
  }
}
