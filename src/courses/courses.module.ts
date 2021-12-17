import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from 'src/NonModule/entity/Course.entity';
import { ClassEntity } from 'src/NonModule/entity/Class.entity';
import { NotificationClassEntity } from 'src/NonModule/entity/NotificationClass.entity';
import { StudentEntity } from 'src/NonModule/entity/Student.entity';
import { StudentClassEntity } from 'src/NonModule/entity/StudentClass.entity';
import { TeacherEntity } from 'src/NonModule/entity/Teacher.entity';
import { TeacherClassEntity } from 'src/NonModule/entity/TeacherClass.entity';
import { TimeTableEntity } from 'src/NonModule/entity/TimeTable.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseEntity]),
    TypeOrmModule.forFeature([ClassEntity]),
    TypeOrmModule.forFeature([TimeTableEntity]), 
    TypeOrmModule.forFeature([StudentClassEntity]),
    TypeOrmModule.forFeature([StudentEntity]),
    TypeOrmModule.forFeature([TeacherClassEntity]),
    TypeOrmModule.forFeature([TeacherEntity]),
    TypeOrmModule.forFeature([NotificationClassEntity]),
  ],
  providers: [CoursesService],
  controllers: [CoursesController],
})
export class CoursesModule {}
