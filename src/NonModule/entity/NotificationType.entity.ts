import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { NotificationClassEntity } from './NotificationClass.entity';

@Entity('notification_type')
export class NotificationTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  name: string;

  @OneToMany(
    () => NotificationClassEntity,
    (noti: NotificationClassEntity) => noti.type,
  )
  noti: NotificationClassEntity[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
