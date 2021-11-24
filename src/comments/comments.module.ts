import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from 'src/NonModule/entity/Comment.entity';
import { NotificationClassEntity } from 'src/NonModule/entity/NotificationClass.entity';
import { StudentClassEntity } from 'src/NonModule/entity/StudentClass.entity';
import { TeacherClassEntity } from 'src/NonModule/entity/TeacherClass.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity]),
    TypeOrmModule.forFeature([StudentClassEntity]),
    TypeOrmModule.forFeature([TeacherClassEntity]),
    TypeOrmModule.forFeature([NotificationClassEntity]),
  ],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
