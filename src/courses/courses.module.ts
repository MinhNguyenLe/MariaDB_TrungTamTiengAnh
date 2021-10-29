import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from 'src/NonModule/entity/Course.entity';
import { ClassEntity } from 'src/NonModule/entity/Class.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseEntity]),
    TypeOrmModule.forFeature([ClassEntity]),
  ],
  providers: [CoursesService],
  controllers: [CoursesController],
})
export class CoursesModule {}
