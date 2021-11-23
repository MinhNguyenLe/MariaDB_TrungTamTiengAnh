import customStatusCode from 'src/NonModule/customStatusCode';

import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  classRoom,
  addTimeTableRoom,
  editClassRoom,
  newClassRoom,
  deleteTimeTableRoom,
} from 'src/NonModule/interface/classRoom.interface';
import { ClassroomsService } from './classrooms.service';

@Controller('classrooms')
export class ClassroomsController {
  constructor(private readonly classroomsService: ClassroomsService) {}

  @Post('/create')
  create(@Body('content') content: newClassRoom) {
    return this.classroomsService.create(content);
  }

  @Get()
  getAll() {
    return this.classroomsService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.classroomsService.getById(id);
  }

  @Post('/edit')
  edit(@Body('content') content: editClassRoom) {
    return this.classroomsService.editInfor(content);
  }

  @Post('/create-timetable')
  addTimeTable(@Body('content') content: addTimeTableRoom) {
    content.timetable.forEach((time) => {
      // if (time.length != 10)
      //   customStatusCode('NOT_ACCEPTABLE', 'Format for timetable incorrect!');
    });

    return this.classroomsService.addTimeTable(content);
  }

  @Delete('/delete-timetable/:id')
  deleteTimeTable(@Param('id') id: number) {
    return this.classroomsService.deleteTimeTable(id);
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
