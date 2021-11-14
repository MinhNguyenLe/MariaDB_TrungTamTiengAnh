import { NotificationClassEntity } from 'src/NonModule/entity/NotificationClass.entity';
import { CourseEntity } from 'src/NonModule/entity/Course.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimeTableEntity } from './TimeTable.entity';

@Entity('class')
export class ClassEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  name: string;

  @OneToMany(
    () => NotificationClassEntity,
    (noti: NotificationClassEntity) => noti.classes,
  )
  noti: NotificationClassEntity[];

  @ManyToOne(() => CourseEntity, (course: CourseEntity) => course.classes)
  course: CourseEntity;

  @OneToMany(
    () => TimeTableEntity,
    (timetable: TimeTableEntity) => timetable.classes,
  )
  timetable: TimeTableEntity[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
