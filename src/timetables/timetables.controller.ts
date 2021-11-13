import { TimetablesService } from './timetables.service';
import { Body, Controller, Post } from '@nestjs/common';
import {
  newNotificationClass,
  editNotificationClass,
} from 'src/NonModule/interface/notificationClass.interface';

@Controller('timetables')
export class TimetablesController {
  constructor(private readonly timetableService: TimetablesService) {}
}
