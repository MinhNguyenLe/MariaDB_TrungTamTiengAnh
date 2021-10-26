import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('class_room')
export class ClassRoomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  address: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
