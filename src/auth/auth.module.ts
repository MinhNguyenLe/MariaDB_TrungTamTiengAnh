import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from 'src/NonModule/entity/Admin.entity';
import { StudentEntity } from 'src/NonModule/entity/Student.entity';
import { TeacherEntity } from 'src/NonModule/entity/Teacher.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity]),
    TypeOrmModule.forFeature([StudentEntity]),
    TypeOrmModule.forFeature([TeacherEntity]),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
