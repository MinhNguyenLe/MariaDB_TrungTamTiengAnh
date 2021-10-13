import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notification_class')
export class NotificationClassEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
