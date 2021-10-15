import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('practice_type')
export class PracticeTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
