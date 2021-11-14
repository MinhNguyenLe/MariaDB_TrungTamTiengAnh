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

@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(
    () => NotificationClassEntity,
    (noti: NotificationClassEntity) => noti.comment,
  )
  noti: NotificationClassEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
