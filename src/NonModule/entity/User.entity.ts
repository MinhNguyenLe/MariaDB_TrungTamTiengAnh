import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from './Role.entity';
import { ScheduleEntity } from './Schedule.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  userName: string;

  @Column({ default: '' })
  password: string;

  @Column({ default: '' })
  email: string;

  @Column({ default: '' })
  lastName: string;

  @Column({ default: '' })
  firstName: string;

  @Column({ default: '' })
  placeBirth: string;

  @Column({ default: '' })
  dateBirth: string;

  @Column({ default: '' })
  phoneNumber: string;

  @Column({ default: '' })
  address: string;

  @Column({ default: 0 }) // 0 : nu 1 : nam
  gender: number;

  @OneToOne(() => RoleEntity)
  @JoinColumn()
  role: RoleEntity;

  @OneToOne(() => ScheduleEntity)
  @JoinColumn()
  schedule: ScheduleEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
