import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notification_class')
export class NotificationClassEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  typeId: number;

  @Column({ default: '' })
  note: string;

  @Column('int', { array: true, default: [] })
  commentId: number[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
