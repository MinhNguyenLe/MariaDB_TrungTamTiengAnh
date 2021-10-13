import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('class_room')
export class ClassRoomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
