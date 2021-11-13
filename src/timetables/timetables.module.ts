import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeTableEntity } from './../NonModule/entity/TimeTable.entity';
import { Module } from '@nestjs/common';
import { TimetablesService } from './timetables.service';
import { TimetablesController } from './timetables.controller';
import { ClassEntity } from 'src/NonModule/entity/Class.entity';
import { ClassRoomEntity } from 'src/NonModule/entity/ClassRoom.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TimeTableEntity]),
    TypeOrmModule.forFeature([ClassRoomEntity]),
    TypeOrmModule.forFeature([ClassEntity]),
  ],
  providers: [TimetablesService],
  controllers: [TimetablesController],
})
export class TimetablesModule {}
