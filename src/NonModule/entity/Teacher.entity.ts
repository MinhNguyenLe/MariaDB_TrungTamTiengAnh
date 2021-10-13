import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('teacher')
export class TeacherEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
