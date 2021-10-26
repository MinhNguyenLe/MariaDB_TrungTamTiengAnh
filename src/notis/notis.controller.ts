import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import {
  newNotificationClass,
  editNotificationClass,
} from 'src/NonModule/interface/notificationClass.interface';
import { NotisService } from './notis.service';

@Controller('notis')
export class NotisController {
  constructor(private readonly notisService: NotisService) {}

  @Post('/create')
  create(@Body('content') content: newNotificationClass) {
    return this.notisService.create(content);
  }

  @Post('/edit')
  edit(@Body('content') content: editNotificationClass) {
    return this.notisService.edit(content);
  }

  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.notisService.deleteById(id);
  }

  @Get()
  getAllCourses() {
    return this.notisService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.notisService.getById(id);
  }

  @Delete()
  clearRepo() {
    return this.notisService.clearRepo();
  }
}
