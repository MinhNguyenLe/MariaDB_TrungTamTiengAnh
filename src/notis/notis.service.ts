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
  editNotificationClass,
  newNotificationClass,
  notificationClass,
} from 'src/NonModule/interface/notificationClass.interface';
import { Repository } from 'typeorm';

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
  ) {}

  async create(content: newNotificationClass): Promise<notificationClass[]> {
    const classes = await this.classesRepository.findOne({
      id: content.idClass,
    });

    const typeNoti = await this.notiTypeRepository.findOne({
      id: content.idType,
    });

    const newNoti = await this.notiRepository.save({
      type: typeNoti,
      classes: classes,
      content: content.content,
    });

    const arrNoti = [...classes.noti];
    arrNoti.push(newNoti);

    await this.classesRepository.update(
      { id: content.idClass },
      {
        noti: arrNoti,
      },
    );

    return this.notiRepository.find({
      relations: ['studentClass', 'teacherClass', 'type', 'comment', 'classes'],
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
      },
    );
    return this.notiRepository.findOne({ where: { id: content.id } });
  }

  async getById(id: number): Promise<notificationClass> {
    return this.notiRepository.findOne({ where: { id } });
  }

  async getAll(): Promise<notificationClass[]> {
    return this.notiRepository.find();
  }

  async deleteById(id: number): Promise<notificationClass[]> {
    await this.notiRepository.delete({ id });
    return this.notiRepository.find();
  }

  async clearRepo(): Promise<notificationClass[]> {
    await this.notiRepository.clear();
    return this.notiRepository.find();
  }
}
