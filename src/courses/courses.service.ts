import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from 'src/NonModule/entity/Course.entity';
import {
  course,
  courseEdit,
  newCourse,
} from 'src/NonModule/interface/course.interface';
import { Repository } from 'typeorm';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CourseEntity)
    private coursesRepository: Repository<CourseEntity>,
  ) {}

  async createCourse(content: newCourse): Promise<course[]> {
    await this.coursesRepository.save(content);
    return this.coursesRepository.find();
  }

  async editCourse(content: courseEdit): Promise<course> {
    await this.coursesRepository.update(
      { id: content.id },
      {
        name: content.name,
        information: content.information,
        timeBegin: content.timeBegin,
        timeEnd: content.timeEnd,
      },
    );
    return this.coursesRepository.findOne({ where: { id: content.id } });
  }

  async getById(id: number): Promise<course> {
    return this.coursesRepository.findOne({ where: { id } });
  }

  async getAll(): Promise<course[]> {
    return this.coursesRepository.find();
  }

  async deleteById(id: number): Promise<course[]> {
    await this.coursesRepository.delete({ id });
    return this.coursesRepository.find();
  }
}
