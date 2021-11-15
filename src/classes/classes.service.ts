import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import customStatusCode from 'src/NonModule/customStatusCode';
import { ClassEntity } from 'src/NonModule/entity/Class.entity';
import { CourseEntity } from 'src/NonModule/entity/Course.entity';
import { ScheduleEntity } from 'src/NonModule/entity/Schedule.entity';
import { StudentClassEntity } from 'src/NonModule/entity/StudentClass.entity';
import { TeacherClassEntity } from 'src/NonModule/entity/TeacherClass.entity';
import {
  classes,
  classesEdit,
  newClasses,
} from 'src/NonModule/interface/class.interface';
import { course } from 'src/NonModule/interface/course.interface';

import { Repository } from 'typeorm';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(ClassEntity)
    private classesRepository: Repository<ClassEntity>,
    @InjectRepository(CourseEntity)
    private coursesRepository: Repository<CourseEntity>,
    @InjectRepository(ScheduleEntity)
    private scheduleRepository: Repository<ScheduleEntity>,
    @InjectRepository(StudentClassEntity)
    private studentClassRepository: Repository<StudentClassEntity>,
    @InjectRepository(TeacherClassEntity)
    private teacherClassRepository: Repository<TeacherClassEntity>,
  ) {}

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

  async editClass(content: classesEdit): Promise<classes> {
    await this.classesRepository.update(
      { id: content.id },
      {
        name: content.name,
      },
    );
    return this.classesRepository.findOne({ where: { id: content.id } });
  }

  async deleteById(id: number): Promise<classes[]> {
    await this.classesRepository.delete({ id });
    return this.classesRepository.find();
  }

  async getById(id: number): Promise<classes[]> {
    return this.classesRepository.find({ where: { id } });
  }

  async getAll(): Promise<classes[]> {
    return this.classesRepository.find();
  }

  async clearRepo(): Promise<classes[]> {
    await this.classesRepository.clear();
    return this.classesRepository.find();
  }
}
