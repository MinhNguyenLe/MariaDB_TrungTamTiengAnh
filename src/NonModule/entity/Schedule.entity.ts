import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('schedule')
export class ScheduleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  begin: number;

  @Column({ default: 0 })
  end: number;

  @Column({ default: 0 })
  idClass: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
