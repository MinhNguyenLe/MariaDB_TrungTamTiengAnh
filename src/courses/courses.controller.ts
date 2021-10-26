import { Body, Controller, Get, Post, Param, Query } from '@nestjs/common';
import { course } from 'src/NonModule/interface/course.interface';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post('/create')
  create(@Body('content') content: course) {
    return this.coursesService.createCourse(content);
  }

  @Get()
  getAllCourses() {
    return this.coursesService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.coursesService.getById(parseInt(id));
  }
}
