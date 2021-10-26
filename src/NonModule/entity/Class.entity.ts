import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('class')
export class ClassEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  name: string;

  @Column({ default: 0 })
  notiId: number;

  @Column({ nullable: false })
  courseId: number;

  @Column({ default: 0 })
  roomId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
