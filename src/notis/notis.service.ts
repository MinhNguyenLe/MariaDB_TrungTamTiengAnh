import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassEntity } from 'src/NonModule/entity/Class.entity';
import { NotificationClassEntity } from 'src/NonModule/entity/NotificationClass.entity';
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
  ) {}

  async create(content: newNotificationClass): Promise<notificationClass[]> {
    const newNoti = await this.notiRepository.save(content);

    const classHere = await this.classesRepository.findOne({
      id: content.idClass,
    });
    const arrNoti = classHere.idNoti;
    arrNoti.push(newNoti.id);

    await this.classesRepository.update(
      { id: content.idClass },
      {
        idNoti: arrNoti,
      },
    );

    return this.notiRepository.find();
  }

  async edit(content: editNotificationClass): Promise<notificationClass> {
    await this.notiRepository.update(
      { id: content.id },
      {
        idType: content.idType,
        note: content.note,
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
    return await this.notiRepository.find();
  }
}
