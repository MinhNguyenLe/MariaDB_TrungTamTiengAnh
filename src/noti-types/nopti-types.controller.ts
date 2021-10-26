import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  newNotificationClass,
  editNotificationClass,
} from 'src/NonModule/interface/notificationClass.interface';
import {
  newNotificationType,
  notificationType,
} from 'src/NonModule/interface/notificationType.interface';
import { NoptiTypesService } from './nopti-types.service';

@Controller('nopti-types')
export class NoptiTypesController {
  constructor(private readonly notiTypesService: NoptiTypesService) {}

  @Post('/create')
  create(@Body('content') content: newNotificationType) {
    return this.notiTypesService.create(content);
  }

  @Post('/edit')
  edit(@Body('content') content: notificationType) {
    return this.notiTypesService.edit(content);
  }

  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.notiTypesService.deleteById(id);
  }

  @Get()
  getAllCourses() {
    return this.notiTypesService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.notiTypesService.getById(id);
  }

  @Delete()
  clearRepo() {
    return this.notiTypesService.clearRepo();
  }
}
