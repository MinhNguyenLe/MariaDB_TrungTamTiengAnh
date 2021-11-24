import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from '../NonModule/entity/Student.entity';
import { UsersController } from './user.controller';
import { UserEntity } from '../NonModule/entity/User.entity';
import { UsersService } from './user.service';
import { TeacherEntity } from 'src/NonModule/entity/Teacher.entity';
import { AdminEntity } from 'src/NonModule/entity/Admin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([AdminEntity]),
    TypeOrmModule.forFeature([StudentEntity]),
    TypeOrmModule.forFeature([TeacherEntity]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
