import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from 'src/NonModule/entity/Course.entity';
import { course } from 'src/NonModule/interface/course.interface';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private coursesRepository: Repository<CourseEntity>,
  ) {}

  async createCourse(content: course): Promise<course[]> {
    await this.coursesRepository.save(content);
    return this.coursesRepository.find();
  }
}
