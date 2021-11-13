import { TimeTableEntity } from 'src/NonModule/entity/TimeTable.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('class_room')
export class ClassRoomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  address: string;

  @OneToMany(
    () => TimeTableEntity,
    (timetable: TimeTableEntity) => timetable.classroom,
  )
  timetable: TimeTableEntity[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
