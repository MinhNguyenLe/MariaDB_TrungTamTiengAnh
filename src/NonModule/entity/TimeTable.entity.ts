import { timeTable } from './../interface/timeTable.interface';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ClassRoomEntity } from './ClassRoom.entity';

@Entity('timetable')
export class TimeTableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  classes: number;

  @ManyToOne(
    () => ClassRoomEntity,
    (classroom: ClassRoomEntity) => classroom.timetable,
  )
  classroom: ClassRoomEntity;

  @Column({ default: 0 })
  begin: number;

  @Column({ default: 0 })
  end: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
