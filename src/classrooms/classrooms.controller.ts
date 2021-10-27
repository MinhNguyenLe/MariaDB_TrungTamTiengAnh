import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { classRoom } from 'src/NonModule/interface/classRoom.interface';
import { ClassroomsService } from './classrooms.service';

@Controller('classrooms')
export class ClassroomsController {
  constructor(private readonly classroomsService: ClassroomsService) {}

  @Post('/create')
  create(@Body('content') content: classRoom) {
    return this.classroomsService.create(content);
  }

  @Get()
  getAll() {
    return this.classroomsService.getAll();
  }

  @Post('/edit')
  edit(@Body('content') content: classRoom) {
    return this.classroomsService.edit(content);
  }

  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.classroomsService.deleteById(id);
  }

  @Delete()
  clearRepo() {
    return this.classroomsService.clearRepo();
  }
}
