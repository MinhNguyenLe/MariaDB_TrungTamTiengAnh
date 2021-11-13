import { ClassRoomEntity } from 'src/NonModule/entity/ClassRoom.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassEntity } from 'src/NonModule/entity/Class.entity';
import { TimeTableEntity } from 'src/NonModule/entity/TimeTable.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TimetablesService {
  constructor(
    @InjectRepository(TimeTableEntity)
    private timetableRepository: Repository<TimeTableEntity>,
    @InjectRepository(ClassEntity)
    private classesRepository: Repository<ClassEntity>,
    @InjectRepository(ClassRoomEntity)
    private classroomRepository: Repository<ClassRoomEntity>,
  ) {}
}
