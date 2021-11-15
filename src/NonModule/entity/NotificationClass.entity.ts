import { ClassEntity } from './Class.entity';
import { CommentEntity } from './Comment.entity';
import { NotificationTypeEntity } from 'src/NonModule/entity/NotificationType.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StudentClassEntity } from './StudentClass.entity';
import { TeacherClassEntity } from './TeacherClass.entity';

@Entity('notification_class')
export class NotificationClassEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => NotificationTypeEntity)
  @JoinColumn()
  type: NotificationTypeEntity;

  @Column({ default: '' })
  content: string;

  @ManyToOne(
    () => StudentClassEntity,
    (studentClass: StudentClassEntity) => studentClass.noti,
  )
  studentClass: StudentClassEntity;

  @ManyToOne(
    () => TeacherClassEntity,
    (teacherClass: TeacherClassEntity) => teacherClass.noti,
  )
  teacherClass: TeacherClassEntity;

  @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.noti)
  comment: CommentEntity[];

  @ManyToOne(() => ClassEntity, (classes: ClassEntity) => classes.noti)
  classes: ClassEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
