import { CourseEntity } from 'src/NonModule/entity/Course.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('class')
export class ClassEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  name: string;

  @Column('int', { array: true, default: [] })
  idNoti: number[];

  @ManyToOne(() => CourseEntity, (course: CourseEntity) => course.classes)
  courses: CourseEntity;

  @Column({ default: 0 })
  idRoom: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
