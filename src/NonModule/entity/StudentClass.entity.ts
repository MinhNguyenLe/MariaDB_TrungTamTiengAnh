import { CommentEntity } from 'src/NonModule/entity/Comment.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ClassEntity } from './Class.entity';
import { NotificationClassEntity } from './NotificationClass.entity';
import { StudentEntity } from './Student.entity';

@Entity('student_class')
export class StudentClassEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { array: true ,default:[] })
  multiChoice: string[];

  @Column("text", { array: true  ,default:[1,1,1,1,1,1,1,1,1,1,1]})
  scoreProgress: string[];

  @Column({default:""})
  quizzesScore: string;

  @ManyToOne(
    () => StudentEntity,
    (student: StudentEntity) => student.studentClass,
    { onDelete: 'CASCADE' },
  )
  student: StudentEntity;

  @ManyToOne(
    () => ClassEntity,
    (classes: ClassEntity) => classes.studentClass,
    { onDelete: 'CASCADE' },
  )
  classes: ClassEntity;

  @Column({ default: false })
  isPaid: boolean;

  @OneToMany(
    () => CommentEntity,
    (comment: CommentEntity) => comment.studentClass,
  )
  comment: CommentEntity[];

  @OneToMany(
    () => NotificationClassEntity,
    (noti: NotificationClassEntity) => noti.studentClass,
  )
  noti: NotificationClassEntity[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
