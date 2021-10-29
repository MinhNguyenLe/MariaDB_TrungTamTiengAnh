import {
  classRoom,
  editClassRoom,
  newClassRoom,
  editTimeTableRoom,
  deleteTimeTableRoom,
} from './../NonModule/interface/classRoom.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassRoomEntity } from 'src/NonModule/entity/ClassRoom.entity';
import { Repository } from 'typeorm';

import { useCheckTimeTableRoom } from 'src/NonModule/customHook/useCheckTimeTableRoom';

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
    const { check, arrangeTimeTable } = useCheckTimeTableRoom();
    const room = await this.classroomsRepository.findOne({
      where: { id: content.id },
    });

    /**
     * validate input -> return string[]
     */
    const accept = check(room.timeTable, content.timeTable);

    const result = [...room.timeTable];
    accept.forEach((e) => {
      result.push(e);
    });
    const resultArrange = arrangeTimeTable(result);

    await this.classroomsRepository.update(
      { id: content.id },
      {
        timeTable: resultArrange,
      },
    );
    return this.classroomsRepository.findOne({ where: { id: content.id } });
  }

  async deleteTimeTable(content: deleteTimeTableRoom): Promise<classRoom> {
    /**
     * validate input -> return string[]
     */
    const classroom = await this.classroomsRepository.findOne({
      where: { id: content.id },
    });

    const result = classroom.timeTable.filter((e) => {
      return e != content.value;
    });

    await this.classroomsRepository.update(
      { id: content.id },
      {
        timeTable: result,
      },
    );
    return this.classroomsRepository.findOne({ where: { id: content.id } });
  }

  async clearRepo(): Promise<classRoom[]> {
    await this.classroomsRepository.clear();
    return this.classroomsRepository.find();
  }
}
