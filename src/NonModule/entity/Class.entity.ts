import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('class')
export class ClassEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  name: string;

  @Column('int', { array: true, default: [] })
  idNoti: number[];

  @Column({ nullable: false })
  idCourse: number;

  @Column({ default: 0 })
  idRoom: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
