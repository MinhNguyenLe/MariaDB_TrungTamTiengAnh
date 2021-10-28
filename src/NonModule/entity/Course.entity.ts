import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('course')
export class CourseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  information: string;

  @Column({ default: '' })
  level: string;

  @Column({ default: '' })
  docs: string;

  @Column({ default: 0 })
  tuition: number;

  @Column({ default: 0 })
  members: number;

  @Column('int', { array: true, default: [] })
  idClass: number[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timeBegin: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timeEnd: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
