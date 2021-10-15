import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('practice')
export class PracticeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
