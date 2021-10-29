import {
  classRoom,
  editClassRoom,
  newClassRoom,
  editTimeTableRoom,
} from './../NonModule/interface/classRoom.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassRoomEntity } from 'src/NonModule/entity/ClassRoom.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClassroomsService {
  constructor(
    @InjectRepository(ClassRoomEntity)
    private classroomsRepository: Repository<ClassRoomEntity>,
  ) {}

  async getById(id: number): Promise<classRoom> {
    return this.classroomsRepository.findOne({ where: { id } });
  }

  async getAll(): Promise<classRoom[]> {
    return this.classroomsRepository.find();
  }

  async deleteById(id: number): Promise<classRoom[]> {
    await this.classroomsRepository.delete({ id });
    return this.classroomsRepository.find();
  }

  async create(content: newClassRoom): Promise<classRoom[]> {
    await this.classroomsRepository.save(content);

    return this.classroomsRepository.find();
  }

  async editInfor(content: editClassRoom): Promise<classRoom> {
    await this.classroomsRepository.update(
      { id: content.id },
      {
        name: content.name,
        address: content.address,
      },
    );
    return this.classroomsRepository.findOne({ where: { id: content.id } });
  }

  async editTimeTable(content: editTimeTableRoom): Promise<classRoom> {
    await this.classroomsRepository.update(
      { id: content.id },
      {
        timeTable: content.timeTable,
      },
    );
    return this.classroomsRepository.findOne({ where: { id: content.id } });
  }

  async clearRepo(): Promise<classRoom[]> {
    await this.classroomsRepository.clear();
    return await this.classroomsRepository.find();
  }
}
