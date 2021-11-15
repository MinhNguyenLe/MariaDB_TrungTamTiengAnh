import { NotificationClassEntity } from 'src/NonModule/entity/NotificationClass.entity';
import { UserEntity } from './User.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StudentClassEntity } from './StudentClass.entity';
import { TeacherClassEntity } from './TeacherClass.entity';

@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(
    () => StudentClassEntity,
    (studentClass: StudentClassEntity) => studentClass.comment,
  )
  studentClass: StudentClassEntity;

  @ManyToOne(
    () => TeacherClassEntity,
    (teacherClass: TeacherClassEntity) => teacherClass.comment,
  )
  teacherClass: TeacherClassEntity;

  @ManyToOne(
    () => NotificationClassEntity,
    (noti: NotificationClassEntity) => noti.comment,
  )
  noti: NotificationClassEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
