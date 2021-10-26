import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationTypeEntity } from 'src/NonModule/entity/NotificationType.entity';
import {
  newNotificationClass,
  notificationClass,
  editNotificationClass,
} from 'src/NonModule/interface/notificationClass.interface';
import {
  newNotificationType,
  notificationType,
} from 'src/NonModule/interface/notificationType.interface';
import { Repository } from 'typeorm';

@Injectable()
export class NoptiTypesService {
  constructor(
    @InjectRepository(NotificationTypeEntity)
    private notiTypesRepository: Repository<NotificationTypeEntity>,
  ) {}

  async create(content: newNotificationType): Promise<notificationType[]> {
    await this.notiTypesRepository.save(content);
    return this.notiTypesRepository.find();
  }

  async edit(content: notificationType): Promise<notificationType> {
    await this.notiTypesRepository.update(
      { id: content.id },
      {
        name: content.name,
      },
    );
    return this.notiTypesRepository.findOne({ where: { id: content.id } });
  }

  async getById(id: number): Promise<notificationType> {
    return this.notiTypesRepository.findOne({ where: { id } });
  }

  async getAll(): Promise<notificationType[]> {
    return this.notiTypesRepository.find();
  }

  async deleteById(id: number): Promise<notificationType[]> {
    await this.notiTypesRepository.delete({ id });
    return this.notiTypesRepository.find();
  }

  async clearRepo(): Promise<notificationType[]> {
    await this.notiTypesRepository.clear();
    return await this.notiTypesRepository.find();
  }
}
