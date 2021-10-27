import { Module } from '@nestjs/common';
import { NotiTypesService } from './noti-types.service';
import { NotiTypesController } from './noti-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationTypeEntity } from 'src/NonModule/entity/NotificationType.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationTypeEntity])],
  providers: [NotiTypesService],
  controllers: [NotiTypesController],
})
export class NotiTypesModule {}
