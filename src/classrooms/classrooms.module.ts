import { Module } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { ClassroomsController } from './classrooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassRoomEntity } from 'src/NonModule/entity/ClassRoom.entity';
import { TimeTableEntity } from 'src/NonModule/entity/TimeTable.entity';
import { ClassEntity } from 'src/NonModule/entity/Class.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClassRoomEntity]),
    TypeOrmModule.forFeature([TimeTableEntity]),
    TypeOrmModule.forFeature([ClassEntity]),
  ],
  providers: [ClassroomsService],
  controllers: [ClassroomsController],
})
export class ClassroomsModule {}
