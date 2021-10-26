import { Module } from '@nestjs/common';
import { NoptiTypesService } from './nopti-types.service';
import { NoptiTypesController } from './nopti-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationTypeEntity } from 'src/NonModule/entity/NotificationType.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationTypeEntity])],
  providers: [NoptiTypesService],
  controllers: [NoptiTypesController],
})
export class NotiTypesModule {}
