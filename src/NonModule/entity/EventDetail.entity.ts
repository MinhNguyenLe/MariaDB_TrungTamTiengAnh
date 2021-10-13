import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('event_detail')
export class EventDetailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
