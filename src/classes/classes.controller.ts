import { Body, Controller, Post, Get, Delete, Param } from '@nestjs/common';
import {
  classes,
  classesEdit,
  newClasses,
} from 'src/NonModule/interface/class.interface';
import { newStudentClass } from 'src/NonModule/interface/studentClass.interface';
import { newTeacherClass } from 'src/NonModule/interface/teacherClass.interface';
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

  @Get(':code')
  getByCode(@Param('code') code: string) {
    return this.classesService.getByCode(code);
  }

  @Get('/student-class/:code')
  getAllStudentClass(@Param('code') code: string) {
    return this.classesService.getAllStudentClass(code);
  }
  /**
   * test return all student class
   */
  @Get('/student/:x')
  getAllStudentClassEntity() {
    return this.classesService.getAllStudentClassEntity();
  }
  @Get('/teacher/:x')
  getAllTeacherClassEntity() {
    return this.classesService.getAllTeacherClassEntity();
  }

  @Get('/teacher-class/:code')
  v(@Param('code') code: string) {
    return this.classesService.getAllTeacherClass(code);
  }

  @Post('/edit')
  edit(@Body('content') content: classesEdit) {
    return this.classesService.editClass(content);
  }

  @Post('/create-student-class')
  createStudentClass(@Body('content') content: newStudentClass) {
    return this.classesService.createStudentClass(content);
  }

  @Post('/create-student-class/all')
  createStudentClassGetAll(@Body('content') content: newStudentClass) {
    return this.classesService.createStudentClassGetAll(content);
  }

  @Post('/create-teacher-class')
  createTeacherClass(@Body('content') content: newTeacherClass) {
    return this.classesService.createTeacherClass(content);
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.classesService.getById(id);
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
