import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('teacher_class')
export class TimeTableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  idClass: number;

  @Column({ default: 0 })
  idClassRoom: number;

  @Column({ default: 0 })
  begin: number;

  @Column({ default: 0 })
  end: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
