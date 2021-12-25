import { time } from 'console';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import customStatusCode from 'src/NonModule/customStatusCode';
import { ClassEntity } from 'src/NonModule/entity/Class.entity';
import { CourseEntity } from 'src/NonModule/entity/Course.entity';
import { ScheduleEntity } from 'src/NonModule/entity/Schedule.entity';
import { StudentEntity } from 'src/NonModule/entity/Student.entity';
import { StudentClassEntity } from 'src/NonModule/entity/StudentClass.entity';
import { TeacherEntity } from 'src/NonModule/entity/Teacher.entity';
import { TeacherClassEntity } from 'src/NonModule/entity/TeacherClass.entity';
import {
  classes,
  classesEdit,
  newClasses,
} from 'src/NonModule/interface/class.interface';
import { student } from 'src/NonModule/interface/student.interface';

import { course } from 'src/NonModule/interface/course.interface';
import {
  newStudentClass,
  studentClass,
} from 'src/NonModule/interface/studentClass.interface';
import {
  newTeacherClass,
  teacherClass,
} from 'src/NonModule/interface/teacherClass.interface';

import { useCheckTimeTableRoom } from 'src/NonModule/customHook/useCheckTimeTableRoom';

import { Repository } from 'typeorm';
import { UserEntity } from 'src/NonModule/entity/User.entity';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(ClassEntity)
    private classesRepository: Repository<ClassEntity>,
    @InjectRepository(CourseEntity)
    private coursesRepository: Repository<CourseEntity>,
    @InjectRepository(ScheduleEntity)
    private scheduleRepository: Repository<ScheduleEntity>,
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
    @InjectRepository(StudentClassEntity)
    private studentClassRepository: Repository<StudentClassEntity>,
    @InjectRepository(TeacherClassEntity)
    private teacherClassRepository: Repository<TeacherClassEntity>,
    @InjectRepository(TeacherEntity)
    private teacherRepository: Repository<TeacherEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createTestMultiChoice(content: string[],id:number): Promise<classes[]> {
    await this.teacherClassRepository.update(
      { id: id },
      {
        multiChoice: content
      },
    );
    return this.classesRepository.find({
      relations: [
        'noti',
        'studentClass',
        'teacherClass',
        'course',
        'timetable',
        'timetable.classroom',
        'studentClass.student',
        'studentClass.student.schedule',
        'studentClass.student.user',
        'teacherClass.teacher.user',
        'studentClass.student.schedule.timetable',
        'teacherClass.teacher',
        'teacherClass.teacher.schedule',
        'teacherClass.teacher.schedule.timetable',
      ],
    });
  }

  async createMultiChoice(content: string[],id:number): Promise<classes[]> {
    await this.studentClassRepository.update(
      { id: id },
      {
        multiChoice: content
      },
    );
    return this.classesRepository.find({
      relations: [
        'noti',
        'studentClass',
        'teacherClass',
        'course',
        'timetable',
        'timetable.classroom',
        'studentClass.student',
        'studentClass.student.schedule',
        'studentClass.student.user',
        'teacherClass.teacher.user',
        'studentClass.student.schedule.timetable',
        'teacherClass.teacher',
        'teacherClass.teacher.schedule',
        'teacherClass.teacher.schedule.timetable',
      ],
    });
  }

  async createClass(content: newClasses): Promise<course[]> {
    if (!content.course)
      customStatusCode('INTERNAL_SERVER_ERROR', 'id of course must require');

    const course = await this.coursesRepository.findOne({
      where: { id: content.course },
      relations: ['classes'],
    });
    if (!course)
      customStatusCode('INTERNAL_SERVER_ERROR', 'course is incorrect!');

    //có course tự update qua courseEntity
    await this.classesRepository.save({
      name: content.name,
      code: content.code,
      course: course,
    });

    return this.coursesRepository.find({ relations: ['classes'] });
  }

  async createStudentClass(content: newStudentClass): Promise<classes> {
    const { check, sortArr } = useCheckTimeTableRoom();

    const user = await this.userRepository.findOne({
      where: {
        email: content.email,
      },
    });
    if (!user) customStatusCode('INTERNAL_SERVER_ERROR', 'email is incorrect');

    const student = await this.studentRepository.findOne({
      where: {
        user: user,
      },
      relations: ['schedule', 'schedule.timetable'],
    });

    const schedule = [];
    student.schedule.forEach((item) => {
      schedule.push(item.timetable);
    });
    console.log(schedule);

    const classes = await this.classesRepository.findOne({
      where: {
        code: content.code,
      },
      relations: ['timetable'],
    });
    const checked = check(schedule, classes.timetable);
    if (checked.length !== classes.timetable.length) {
      customStatusCode(
        'INTERNAL_SERVER_ERROR',
        'timetable of this class conflict with timetable student',
      );
    } else {
      for (const item of classes.timetable) {
        await this.scheduleRepository.save({
          student: student,
          timetable: item,
        });
      }
    }

    await this.studentClassRepository.save({
      student: student,
      classes: classes,
      isPaid: content.isPaid,
    });

    return this.classesRepository.findOne({
      where: { code: content.code },
      relations: [
        'noti',
        'studentClass',
        'teacherClass',
        'course',
        'timetable',
        'timetable.classroom',
        'studentClass.student',
        'studentClass.student.schedule',
        'studentClass.student.user',
        'teacherClass.teacher.user',
        'studentClass.student.schedule.timetable',
        'teacherClass.teacher',
        'teacherClass.teacher.schedule',
        'teacherClass.teacher.schedule.timetable',
      ],
    });
  }
  async createStudentClassGetAll(content: newStudentClass): Promise<classes[]> {
    const { check, sortArr } = useCheckTimeTableRoom();

    const user = await this.userRepository.findOne({
      where: {
        email: content.email,
      },
    });
    if (!user) customStatusCode('INTERNAL_SERVER_ERROR', 'email is incorrect');

    const student = await this.studentRepository.findOne({
      where: {
        user: user,
      },
      relations: ['schedule', 'schedule.timetable'],
    });

    const schedule = [];
    student.schedule.forEach((item) => {
      schedule.push(item.timetable);
    });
    console.log(schedule);

    const classes = await this.classesRepository.findOne({
      where: {
        code: content.code,
      },
      relations: ['timetable'],
    });
    const checked = check(schedule, classes.timetable);
    if (checked.length !== classes.timetable.length) {
      customStatusCode(
        'INTERNAL_SERVER_ERROR',
        'timetable of this class conflict with timetable student',
      );
    } else {
      for (const item of classes.timetable) {
        await this.scheduleRepository.save({
          student: student,
          timetable: item,
        });
      }
    }

    await this.studentClassRepository.save({
      student: student,
      classes: classes,
      isPaid: content.isPaid,
    });

    return this.classesRepository.find({
      relations: [
        'noti',
        'studentClass',
        'teacherClass',
        'course',
        'timetable',
        'timetable.classroom',
        'studentClass.student',
        'studentClass.student.schedule',
        'studentClass.student.user',
        'teacherClass.teacher.user',
        'studentClass.student.schedule.timetable',
        'teacherClass.teacher',
        'teacherClass.teacher.schedule',
        'teacherClass.teacher.schedule.timetable',
      ],
    });
  }

  async createStudentClassGetStudent(content: newStudentClass): Promise<student> {
    const { check, sortArr } = useCheckTimeTableRoom();

    const user = await this.userRepository.findOne({
      where: {
        email: content.email,
      },
    });
    if (!user) customStatusCode('INTERNAL_SERVER_ERROR', 'email is incorrect');

    const student = await this.studentRepository.findOne({
      where: {
        user: user,
      },
      relations: ['schedule', 'schedule.timetable'],
    });

    const schedule = [];
   student?.schedule.forEach((item) => {
      schedule.push(item.timetable);
    });
    console.log(schedule);

    const classes = await this.classesRepository.findOne({
      where: {
        code: content.code,
      },
      relations: ['timetable'],
    });

    const checked = schedule ? check(schedule, classes.timetable) : check([], classes.timetable);
    if (checked.length !== classes.timetable.length) {
      customStatusCode(
        'INTERNAL_SERVER_ERROR',
        'timetable of this class conflict with timetable student',
      );
    } else {
      for (const item of classes.timetable) {
        await this.scheduleRepository.save({
          student: student,
          timetable: item,
        });
      }
    }

    await this.studentClassRepository.save({
      student: student,
      classes: classes,
      isPaid: content.isPaid,
    });

    return this.studentRepository.findOne({
      where: {
        user: user,
      },
      relations: [
        'user',
        'studentClass',
        'studentClass.classes',
        'schedule',
        'schedule.timetable',
      ],
    });
  }

  async createTeacherClass(content: newTeacherClass): Promise<classes[]> {
    const { check, sortArr } = useCheckTimeTableRoom();

    const user = await this.userRepository.findOne({
      where: {
        email: content.email,
      },
    });
    if (!user) customStatusCode('INTERNAL_SERVER_ERROR', 'email is incorrect');

    const teacher = await this.teacherRepository.findOne({
      where: {
        user: user,
      },
      relations: ['schedule', 'schedule.timetable'],
    });

    const schedule = [];
    teacher.schedule.forEach((item) => {
      schedule.push(item.timetable);
    });

    const classes = await this.classesRepository.findOne({
      where: {
        code: content.code,
      },
      relations: ['timetable'],
    });

    const checked = check(schedule, classes.timetable);
    if (checked.length !== classes.timetable.length) {
      customStatusCode(
        'INTERNAL_SERVER_ERROR',
        'timetable of this class conflict with timetable teacher',
      );
    } else {
      for (const item of classes.timetable) {
        await this.scheduleRepository.save({
          teacher: teacher,
          timetable: item,
        });
      }
    }

    await this.teacherClassRepository.save({
      teacher: teacher,
      classes: classes,
      isPaid: content.isPaid,
      wage: content.wage,
      bonus: content.bonus,
    });

    return this.classesRepository.find({
      relations: [
        'noti',
        'studentClass',
        'teacherClass',
        'course',
        'timetable',
        'timetable.classroom',
        'studentClass.student',
        'studentClass.student.schedule',
        'studentClass.student.user',
        'teacherClass.teacher.user',
        'studentClass.student.schedule.timetable',
        'teacherClass.teacher',
        'teacherClass.teacher.schedule',
        'teacherClass.teacher.schedule.timetable',
      ],
    });
  }

  async getAllStudentClass(code: string): Promise<studentClass[]> {
    const classes = await this.classesRepository.findOne({
      where: {
        code: code,
      },
    });

    return this.studentClassRepository.find({
      where: { classes: classes },
      relations: ['classes', 'comment', 'noti', 'student'],
    });
  }

  async getAllStudentClassEntity(): Promise<studentClass[]> {
    return this.studentClassRepository.find({
      relations: ['classes', 'comment', 'noti', 'student'],
    });
  }

  async getAllTeacherClassEntity(): Promise<teacherClass[]> {
    return this.teacherClassRepository.find({
      relations: ['classes', 'comment', 'noti', 'teacher'],
    });
  }

  async getAllTeacherClass(code: string): Promise<teacherClass[]> {
    const classes = await this.classesRepository.findOne({
      where: {
        code: code,
      },
    });

    return this.teacherClassRepository.find({
      where: { classes: classes },
      relations: ['classes', 'comment', 'noti', 'teacher'],
    });
  }

  async editClass(content: classesEdit): Promise<classes[]> {
    await this.classesRepository.update(
      { id: content.id },
      {
        name: content.name,
        code: content.code
      },
    );
    return this.classesRepository.find({
      relations: [
        'noti',
        'studentClass',
        'teacherClass',
        'course',
        'timetable',
        'timetable.classroom',
        'studentClass.student',
        'studentClass.student.schedule',
        'studentClass.student.schedule.timetable',
        'studentClass.student.user',
        'teacherClass.teacher',
        'teacherClass.teacher.user',
        'teacherClass.teacher.schedule',
        'teacherClass.teacher.schedule.timetable',
      ],
    });
  }

  async deleteById(id: number): Promise<classes[]> {
    await this.classesRepository.delete({ id });
    return this.classesRepository.find({
      relations: [
        'noti',
        'studentClass',
        'teacherClass',
        'course',
        'timetable',
        'timetable.classroom',
        'studentClass.student',
        'studentClass.student.schedule',
        'studentClass.student.schedule.timetable',
        'studentClass.student.user',
        'teacherClass.teacher',
        'teacherClass.teacher.user',
        'teacherClass.teacher.schedule',
        'teacherClass.teacher.schedule.timetable',
      ],
    });
  }

  async getById(id: number): Promise<classes> {
    return this.classesRepository.findOne({
      where: { id },
      relations: [
        'noti',
        'studentClass',
        'teacherClass',
        'course',
        'timetable',
        'timetable.classroom',
        'studentClass.student',
        'studentClass.student.schedule',
        'studentClass.student.schedule.timetable',
        'studentClass.student.user',
        'teacherClass.teacher',
        'teacherClass.teacher.user',
        'teacherClass.teacher.schedule',
        'teacherClass.teacher.schedule.timetable',
      ],
    });
  }

  async getByCode(code: string): Promise<classes> {
    return this.classesRepository.findOne({
      where: { code: code },
      relations: [
        'noti',
        'studentClass',
        'teacherClass',
        'course',
        'timetable',
        'timetable.classroom',
        'studentClass.student',
        'studentClass.student.schedule',
        'studentClass.student.user',
        'teacherClass.teacher.user',
        'studentClass.student.schedule.timetable',
        'teacherClass.teacher',
        'teacherClass.teacher.schedule',
        'teacherClass.teacher.schedule.timetable',
      ],
    });
  }

  async getAll(): Promise<classes[]> {
    return this.classesRepository.find({
      relations: [
        'noti',
        'studentClass',
        'teacherClass',
        'course',
        'timetable',
        'timetable.classroom',
        'studentClass.student',
        'studentClass.student.schedule',
        'studentClass.student.schedule.timetable',
        'studentClass.student.user',
        'teacherClass.teacher',
        'teacherClass.teacher.user',
        'teacherClass.teacher.schedule',
        'teacherClass.teacher.schedule.timetable',
      ],
    });
  }

  async clearRepo(): Promise<classes[]> {
    await this.studentClassRepository.delete({});
    await this.classesRepository.delete({});
    return this.classesRepository.find();
  }
}
