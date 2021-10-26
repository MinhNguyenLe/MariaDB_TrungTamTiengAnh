import { Body, Controller, Post } from '@nestjs/common';
import { classes } from 'src/NonModule/interface/class.interface';
import { ClassesService } from './classes.service';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post('/create')
  create(@Body('content') content: classes) {
    return this.classesService.createClass(content);
  }
}
