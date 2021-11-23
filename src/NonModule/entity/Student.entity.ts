import { StudentClassEntity } from './StudentClass.entity';
import { UserEntity } from './User.entity';
import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ScheduleEntity } from './Schedule.entity';

@Entity('student')
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @Column({ default: '' })
  education: string;

  @Column({ default: '' })
  level: string;

  @OneToMany(
    () => StudentClassEntity,
    (studentClass: StudentClassEntity) => studentClass.student,
  )
  studentClass: StudentClassEntity[];

  @OneToMany(
    () => ScheduleEntity,
    (schedule: ScheduleEntity) => schedule.student,
  )
  schedule: ScheduleEntity[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
