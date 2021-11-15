import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from '../NonModule/entity/Student.entity';
import { UsersController } from './user.controller';
import { UserEntity } from '../NonModule/entity/User.entity';
import { UsersService } from './user.service';
import { RoleEntity } from 'src/NonModule/entity/Role.entity';
import { TeacherEntity } from 'src/NonModule/entity/Teacher.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([StudentEntity]),
    TypeOrmModule.forFeature([TeacherEntity]),
    TypeOrmModule.forFeature([RoleEntity]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
