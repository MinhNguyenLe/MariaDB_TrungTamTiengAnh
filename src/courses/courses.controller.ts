import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import {
  course,
  courseEdit,
  newCourse,
} from 'src/NonModule/interface/course.interface';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post('/create')
  create(@Body('content') content: newCourse) {
    return this.coursesService.createCourse(content);
  }

  @Post('/edit')
  edit(@Body('content') content: courseEdit) {
    return this.coursesService.editCourse(content);
  }

  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.coursesService.deleteById(id);
  }

  @Get()
  getAllCourses() {
    return this.coursesService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.coursesService.getById(id);
  }
}
