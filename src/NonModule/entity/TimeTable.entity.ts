import { timeTable } from './../interface/timeTable.interface';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClassRoomEntity } from './ClassRoom.entity';
import { ClassEntity } from './Class.entity';
import { ScheduleEntity } from './Schedule.entity';

@Entity('timetable')
export class TimeTableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ClassEntity, (classes: ClassEntity) => classes.timetable, {
    onDelete: 'CASCADE',
  })
  classes: ClassEntity;

  @ManyToOne(
    () => ClassRoomEntity,
    (classroom: ClassRoomEntity) => classroom.timetable,
    { onDelete: 'CASCADE' },
  )
  classroom: ClassRoomEntity;

  @Column({ default: 0 })
  begin: number;

  @Column({ default: 0 })
  end: number;

  @OneToMany(
    () => ScheduleEntity,
    (schedule: ScheduleEntity) => schedule.timetable,
  )
  schedule: ScheduleEntity[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
