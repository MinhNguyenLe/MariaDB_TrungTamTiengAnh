import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('teacher_class')
export class TeacherClassEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
