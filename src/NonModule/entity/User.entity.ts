import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ScheduleEntity } from './Schedule.entity';
import { StudentEntity } from './Student.entity';
import { TeacherEntity } from './Teacher.entity';

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

  @Column({ default: 1 }) // 1 : admin 2 : teacher 3: student
  permission: number;

  @Column({ default: '' })
  nameRole: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
