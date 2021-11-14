import { Module } from '@nestjs/common';
import { NotisService } from './notis.service';
import { NotisController } from './notis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationClassEntity } from 'src/NonModule/entity/NotificationClass.entity';
import { ClassEntity } from 'src/NonModule/entity/Class.entity';
import { NotificationTypeEntity } from 'src/NonModule/entity/NotificationType.entity';
import { CommentEntity } from 'src/NonModule/entity/Comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationClassEntity]),
    TypeOrmModule.forFeature([ClassEntity]),
    TypeOrmModule.forFeature([NotificationTypeEntity]),
    TypeOrmModule.forFeature([CommentEntity]),
  ],
  providers: [NotisService],
  controllers: [NotisController],
})
export class NotisModule {}
