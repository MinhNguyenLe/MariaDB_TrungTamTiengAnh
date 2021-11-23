import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StudentEntity } from './Student.entity';
import { TeacherEntity } from './Teacher.entity';
import { TimeTableEntity } from './TimeTable.entity';
import { UserEntity } from './User.entity';

@Entity('schedule')
export class ScheduleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => TimeTableEntity,
    (timetable: TimeTableEntity) => timetable.schedule,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  timetable: TimeTableEntity;

  @ManyToOne(
    () => StudentEntity,
    (student: StudentEntity) => student.schedule,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  student: StudentEntity;

  @ManyToOne(
    () => TeacherEntity,
    (teacher: TeacherEntity) => teacher.schedule,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  teacher: TeacherEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
