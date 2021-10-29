import customStatusCode from 'src/NonModule/customStatusCode';

import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  classRoom,
  editTimeTableRoom,
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

  @Post('/edit')
  edit(@Body('content') content: editClassRoom) {
    return this.classroomsService.editInfor(content);
  }

  @Post('/edit-timetable')
  editTimeTable(@Body('content') content: editTimeTableRoom) {
    content.timeTable.forEach((time) => {
      if (time.length != 10)
        customStatusCode('NOT_ACCEPTABLE', 'Format for timetable incorrect!');
    });

    return this.classroomsService.editTimeTable(content);
  }

  @Delete('/delete-timetable')
  deleteTimeTable(@Body('content') content: deleteTimeTableRoom) {
    return this.classroomsService.deleteTimeTable(content);
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
