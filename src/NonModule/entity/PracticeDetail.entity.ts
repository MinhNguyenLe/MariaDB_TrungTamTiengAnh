import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('practice_detail')
export class PracticeDetailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
