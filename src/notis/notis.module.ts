import { Module } from '@nestjs/common';
import { NotisService } from './notis.service';
import { NotisController } from './notis.controller';

@Module({
  providers: [NotisService],
  controllers: [NotisController],
})
export class NotisModule {}
