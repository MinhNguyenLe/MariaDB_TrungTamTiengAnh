import { Module } from '@nestjs/common';
import { NotisService } from './notis.service';
import { NotisController } from './notis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationClassEntity } from 'src/NonModule/entity/NotificationClass.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationClassEntity])],
  providers: [NotisService],
  controllers: [NotisController],
})
export class NotisModule {}
