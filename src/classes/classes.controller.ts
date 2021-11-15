import { Body, Controller, Post, Get, Delete, Param } from '@nestjs/common';
import {
  classes,
  classesEdit,
  newClasses,
} from 'src/NonModule/interface/class.interface';
import { newStudentClass } from 'src/NonModule/interface/studentClass.interface';
import { ClassesService } from './classes.service';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post('/create')
  create(@Body('content') content: newClasses) {
    return this.classesService.createClass(content);
  }

  @Get()
  getAll() {
    return this.classesService.getAll();
  }

  @Post('/edit')
  edit(@Body('content') content: classesEdit) {
    return this.classesService.editClass(content);
  }

  @Post('/create-student-class')
  createStudentClass(@Body('content') content: newStudentClass) {
    return this.classesService.createStudentClass(content);
  }

  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.classesService.deleteById(id);
  }

  @Delete()
  clearRepo() {
    return this.classesService.clearRepo();
  }
}
