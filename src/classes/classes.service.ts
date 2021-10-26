import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import customStatusCode from 'src/NonModule/customStatusCode';
import { ClassEntity } from 'src/NonModule/entity/Class.entity';
import { CourseEntity } from 'src/NonModule/entity/Course.entity';
import { classes } from 'src/NonModule/interface/class.interface';
import { Repository } from 'typeorm';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(ClassEntity)
    private classesRepository: Repository<ClassEntity>,
    @InjectRepository(CourseEntity)
    private coursesRepository: Repository<CourseEntity>,
  ) {}

  async createClass(content: classes): Promise<classes[]> {
    if (!content.courseId)
      customStatusCode('INTERNAL_SERVER_ERROR', 'id of course must require');

    const newClass = await this.classesRepository.save(content);

    await this.coursesRepository.update(
      {
        id: content.courseId,
      },
      {
        classID: [newClass.id],
      },
    );

    return this.classesRepository.find();
  }

  async getById(id: number): Promise<classes[]> {
    return this.classesRepository.find({ where: { id } });
  }

  async getAll(): Promise<classes[]> {
    return this.classesRepository.find();
  }
}
