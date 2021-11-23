import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ClassEntity } from './Class.entity';
import { CommentEntity } from './Comment.entity';
import { NotificationClassEntity } from './NotificationClass.entity';
import { TeacherEntity } from './Teacher.entity';

@Entity('teacher_class')
export class TeacherClassEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  wage: number;

  @Column({ default: 0 })
  bonus: number;

  @Column({ default: false })
  isPaid: boolean;

  @ManyToOne(
    () => TeacherEntity,
    (teacher: TeacherEntity) => teacher.teacherClass,
    { onDelete: 'CASCADE' },
  )
  teacher: TeacherEntity;

  @OneToMany(
    () => CommentEntity,
    (comment: CommentEntity) => comment.teacherClass,
  )
  comment: CommentEntity[];

  @OneToMany(
    () => NotificationClassEntity,
    (noti: NotificationClassEntity) => noti.teacherClass,
  )
  noti: NotificationClassEntity[];

  @ManyToOne(
    () => ClassEntity,
    (classes: ClassEntity) => classes.teacherClass,
    { onDelete: 'CASCADE' },
  )
  classes: ClassEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
