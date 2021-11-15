import { NotificationClassEntity } from 'src/NonModule/entity/NotificationClass.entity';
import { CourseEntity } from 'src/NonModule/entity/Course.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimeTableEntity } from './TimeTable.entity';
import { StudentClassEntity } from './StudentClass.entity';
import { TeacherClassEntity } from './TeacherClass.entity';

@Entity('class')
export class ClassEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  code: string;

  @OneToMany(
    () => NotificationClassEntity,
    (noti: NotificationClassEntity) => noti.classes,
  )
  noti: NotificationClassEntity[];

  @OneToMany(
    () => StudentClassEntity,
    (studentClass: StudentClassEntity) => studentClass.classes,
  )
  studentClass: StudentClassEntity[];

  @OneToMany(
    () => TeacherClassEntity,
    (teacherClass: TeacherClassEntity) => teacherClass.classes,
  )
  teacherClass: TeacherClassEntity[];

  @ManyToOne(() => CourseEntity, (course: CourseEntity) => course.classes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  course: CourseEntity;

  @OneToMany(
    () => TimeTableEntity,
    (timetable: TimeTableEntity) => timetable.classes,
  )
  timetable: TimeTableEntity[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
