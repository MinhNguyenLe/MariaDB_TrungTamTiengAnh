import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ScheduleEntity } from './Schedule.entity';
import { TeacherClassEntity } from './TeacherClass.entity';
import { UserEntity } from './User.entity';

@Entity('teacher')
export class TeacherEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @OneToMany(
    () => TeacherClassEntity,
    (teacherClass: TeacherClassEntity) => teacherClass.teacher,
  )
  teacherClass: TeacherClassEntity[];

  @Column({ default: '' })
  certificate: string;

  @Column({ default: '' })
  level: string;

  @OneToMany(
    () => ScheduleEntity,
    (schedule: ScheduleEntity) => schedule.teacher,
  )
  schedule: ScheduleEntity[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
