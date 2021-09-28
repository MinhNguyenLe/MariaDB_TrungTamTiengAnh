import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DemoService } from './services/demo.service';
import { DemoController } from './controllers/demo.controller';
// import { TestLoginEntity } from './models/login.entity';

@Module({
  providers: [DemoService],
  controllers: [DemoController],
  // imports: [TypeOrmModule.forFeature([TestLoginEntity])],
})
export class TestModule {}
