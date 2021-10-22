import { Body, Controller, Post } from '@nestjs/common';
import { course } from 'src/NonModule/interface/course.interface';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly coursesService: CourseService) {}

  @Post('/create')
  create(@Body('content') content: course) {
    return this.coursesService.createCourse(content);
  }
}
