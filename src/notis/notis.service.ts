import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassEntity } from 'src/NonModule/entity/Class.entity';
import { CommentEntity } from 'src/NonModule/entity/Comment.entity';
import { NotificationClassEntity } from 'src/NonModule/entity/NotificationClass.entity';
import { NotificationTypeEntity } from 'src/NonModule/entity/NotificationType.entity';
import {
  newCourse,
  course,
  courseEdit,
} from 'src/NonModule/interface/course.interface';
import {
  classes,
  classesEdit,
  newClasses,
} from 'src/NonModule/interface/class.interface';
import {
  editNotificationClass,
  newNotificationClass,
  notificationClass,
} from 'src/NonModule/interface/notificationClass.interface';
import { Repository } from 'typeorm';
import { StudentClassEntity } from 'src/NonModule/entity/StudentClass.entity';
import { TeacherClassEntity } from 'src/NonModule/entity/TeacherClass.entity';

@Injectable()
export class NotisService {
  constructor(
    @InjectRepository(NotificationClassEntity)
    private notiRepository: Repository<NotificationClassEntity>,
    @InjectRepository(ClassEntity)
    private classesRepository: Repository<ClassEntity>,
    @InjectRepository(NotificationTypeEntity)
    private notiTypeRepository: Repository<NotificationTypeEntity>,
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
    @InjectRepository(StudentClassEntity)
    private studentClassRepository: Repository<StudentClassEntity>,
    @InjectRepository(TeacherClassEntity)
    private teacherClassRepository: Repository<TeacherClassEntity>,
  ) {}

  async create(content: newNotificationClass): Promise<classes> {
    const classes = await this.classesRepository.findOne({
      where:{id: content.idClass}
    });

    const typeNoti = await this.notiTypeRepository.findOne({
      where:{id: content.idType}
    });
    if (content.role === 'student') {
      const student = await this.studentClassRepository.findOne({
        id: content.idUserClass,
      });
      await this.notiRepository.save({
        type: typeNoti,
        classes: classes,
        content: content.content,
        title: content.title,
        studentClass: student,
      });
    } 
    if (content.role === 'teacher') {
      const teacher = await this.teacherClassRepository.findOne({
        id: content.idUserClass,
      });
      await this.notiRepository.save({
        type: typeNoti,
        classes: classes,
        content: content.content,
        title: content.title,
        teacherClass: teacher,
      });
    }

    return this.classesRepository.findOne({
      where: { id: content.idClass },
      relations: [
        'noti',
        'studentClass',
        'teacherClass',
        'course',
        'timetable',
        'timetable.classroom',
        'studentClass.student',
        'studentClass.student.schedule',
        'studentClass.student.user',
        'teacherClass.teacher.user',
        'studentClass.student.schedule.timetable',
        'teacherClass.teacher',
        'teacherClass.teacher.schedule',
        'teacherClass.teacher.schedule.timetable',
      ],
    });
  }

  async edit(content: editNotificationClass): Promise<notificationClass> {
    const typeNoti = await this.notiTypeRepository.findOne({
      id: content.idType,
    });

    await this.notiRepository.update(
      { id: content.id },
      {
        type: typeNoti,
        content: content.content,
        title: content.title,
      },
    );
    return this.notiRepository.findOne({ where: { id: content.id } });
  }

  async getById(id: number): Promise<notificationClass> {
    return this.notiRepository.findOne({
      where: { id },
      relations: [
        'type',
        'comment',
        'comment.studentClass',
        'comment.teacherClass',
        'studentClass',
        'teacherClass',
        'studentClass.student',
        'studentClass.student.schedule',
        'studentClass.student.user',
        'teacherClass.teacher.user',
        'studentClass.student.schedule.timetable',
        'teacherClass.teacher',
        'teacherClass.teacher.schedule',
        'teacherClass.teacher.schedule.timetable',
        'classes',
      ],
    });
  }

  async getAll(): Promise<notificationClass[]> {
    return this.notiRepository.find({
      relations: ['classes', 'studentClass', 'teacherClass'],
    });
  }

  async deleteById(id: number): Promise<notificationClass[]> {
    await this.notiRepository.delete({ id });
    return this.notiRepository.find();
  }

  async clearRepo(): Promise<notificationClass[]> {
    await this.notiRepository.delete({});
    return this.notiRepository.find();
  }
}
