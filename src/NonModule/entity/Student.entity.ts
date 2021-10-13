import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('student')
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idUser: number;

  // @Column()
  // classId: [number];

  @Column()
  isPaid: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
