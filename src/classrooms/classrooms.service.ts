import { timeTable } from './../NonModule/interface/timeTable.interface';
import {
  classRoom,
  editClassRoom,
  newClassRoom,
  addTimeTableRoom,
  deleteTimeTableRoom,
} from './../NonModule/interface/classRoom.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassRoomEntity } from 'src/NonModule/entity/ClassRoom.entity';
import { Repository } from 'typeorm';

import { useCheckTimeTableRoom } from 'src/NonModule/customHook/useCheckTimeTableRoom';
import { TimeTableEntity } from 'src/NonModule/entity/TimeTable.entity';
import { ClassEntity } from 'src/NonModule/entity/Class.entity';
import { time } from 'console';

@Injectable()
export class ClassroomsService {
  constructor(
    @InjectRepository(ClassRoomEntity)
    private classroomsRepository: Repository<ClassRoomEntity>,
    @InjectRepository(TimeTableEntity)
    private timetableRepository: Repository<TimeTableEntity>,
    @InjectRepository(ClassEntity)
    private classRepository: Repository<ClassEntity>,
  ) {}

  async getById(id: number): Promise<classRoom> {
    return this.classroomsRepository.findOne({ where: { id } });
  }

  async getAll(): Promise<classRoom[]> {
    return this.classroomsRepository.find({ relations: ['timetable'] });
  }

  async deleteById(id: number): Promise<classRoom[]> {
    await this.classroomsRepository.delete({ id });
    return this.classroomsRepository.find({ relations: ['timetable'] });
  }

  async create(content: newClassRoom): Promise<classRoom[]> {
    await this.classroomsRepository.save(content);

    return this.classroomsRepository.find({ relations: ['timetable'] });
  }

  async editInfor(content: editClassRoom): Promise<classRoom[]> {
    await this.classroomsRepository.update(
      { id: content.id },
      {
        name: content.name,
        address: content.address,
      },
    );
    return this.classroomsRepository.find({ relations: ['timetable'] });
  }

  async addTimeTable(content: addTimeTableRoom): Promise<classRoom> {
    const { check, sortArr } = useCheckTimeTableRoom();

    const classroom = await this.classroomsRepository.findOne({
      where: { id: content.idRoom },
      relations: ['timetable'],
    });

    const classes = await this.classRepository.findOne({
      where: { id: content.idClass },
    });

    // verify new timetable
    const accept = [];
    for (const item of check(classroom.timetable, content.timetable)) {
      const newItem = await this.timetableRepository.save({
        classes: classes,
        classroom: classroom,
        begin: item.begin,
        end: item.end,
      });
      console.log('new timetable', newItem);
      accept.push(newItem);
    }

    return this.classroomsRepository.findOne({ where: { id: content.idRoom } });
  }

  async deleteTimeTable(id: number): Promise<classRoom[]> {
    await this.timetableRepository.delete({ id });

    return this.classroomsRepository.find({ relations: ['timetable'] });
  }

  async clearRepo(): Promise<classRoom[]> {
    await this.classroomsRepository.clear();
    return this.classroomsRepository.find();
  }
}
