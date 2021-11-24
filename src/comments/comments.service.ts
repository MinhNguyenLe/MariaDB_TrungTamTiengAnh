import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { identity } from 'rxjs';
import { CommentEntity } from 'src/NonModule/entity/Comment.entity';
import { NotificationClassEntity } from 'src/NonModule/entity/NotificationClass.entity';
import { StudentClassEntity } from 'src/NonModule/entity/StudentClass.entity';
import { TeacherClassEntity } from 'src/NonModule/entity/TeacherClass.entity';
import {
  newComment,
  commentType,
  editComment,
} from 'src/NonModule/interface/comment.interface';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
    @InjectRepository(StudentClassEntity)
    private studentClassRepository: Repository<StudentClassEntity>,
    @InjectRepository(TeacherClassEntity)
    private teacherClassRepository: Repository<TeacherClassEntity>,
    @InjectRepository(NotificationClassEntity)
    private notiRepository: Repository<NotificationClassEntity>,
  ) {}

  async create(content: newComment): Promise<commentType[]> {
    const noti = await this.notiRepository.findOne({
      where: { id: content.idNoti },
    });

    if (content.role === 'student') {
      const student = await this.studentClassRepository.findOne({
        where: { id: content.idUserClass },
      });
      await this.commentRepository.save({
        studentClass: student,
        noti: noti,
        content: content.content,
      });
    } else {
      const teacher = await this.teacherClassRepository.findOne({
        where: { id: content.idUserClass },
      });
      await this.commentRepository.save({
        teacherClass: teacher,
        noti: noti,
        content: content.content,
      });
    }
    return this.commentRepository.find({
      relations: ['noti', 'teacherClass', 'studentClass'],
    });
  }

  async edit(content: editComment): Promise<commentType[]> {
    await this.commentRepository.update(
      { id: content.id },
      {
        content: content.content,
      },
    );
    return this.commentRepository.find({
      relations: ['noti', 'teacherClass', 'studentClass'],
    });
  }

  async getById(id: number): Promise<commentType> {
    return this.commentRepository.findOne({
      where: { id },
      relations: ['noti', 'teacherClass', 'studentClass'],
    });
  }

  async getByIdNoti(id: number): Promise<commentType> {
    const noti = await this.notiRepository.findOne({ where: { id } });
    return this.commentRepository.findOne({
      where: { noti },
      relations: [
        'noti',
        'teacherClass',
        'studentClass',
        'studentClass.student',
        'studentClass.student.schedule',
        'studentClass.student.schedule.timetable',
        'studentClass.student.user',
        'teacherClass.teacher',
        'teacherClass.teacher.user',
        'teacherClass.teacher.schedule',
        'teacherClass.teacher.schedule.timetable',
      ],
    });
  }

  async getAll(): Promise<commentType[]> {
    return this.commentRepository.find({
      relations: ['noti', 'teacherClass', 'studentClass'],
    });
  }

  async deleteById(id: number): Promise<commentType[]> {
    await this.commentRepository.delete({ id });
    return this.commentRepository.find({
      relations: ['noti', 'teacherClass', 'studentClass'],
    });
  }

  async clearRepo(): Promise<commentType[]> {
    await this.commentRepository.delete({});
    return this.commentRepository.find();
  }
}
