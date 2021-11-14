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
    return this.classroomsRepository.find();
  }

  async deleteById(id: number): Promise<classRoom[]> {
    const dataDelete = await this.classroomsRepository.findOne({ id });
    [...dataDelete.timetable].forEach(async (item) => {
      await this.timetableRepository.delete({
        id: item.id,
      });
    });

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

  async editTimeTable(content: addTimeTableRoom): Promise<classRoom> {
    const { check, sortArr } = useCheckTimeTableRoom();

    const classroom = await this.classroomsRepository.findOne({
      where: { id: content.id },
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

    // update timetable for classroom and class
    const newTTRoom = [...accept],
      newTTClass = [...accept];

    classroom.timetable.forEach((item) => {
      newTTRoom.push(item);
    });

    classes.timetable.forEach((item) => {
      newTTClass.push(item);
    });

    // sort with begin and save to entity
    await this.classroomsRepository.update(
      { id: content.id },
      {
        timetable: sortArr(newTTRoom),
      },
    );

    await this.classRepository.update(
      { id: content.idClass },
      {
        timetable: sortArr(newTTClass),
      },
    );

    return this.classroomsRepository.findOne({ where: { id: content.id } });
  }

  async deleteTimeTable(content: deleteTimeTableRoom): Promise<classRoom> {
    const classroom = await this.classroomsRepository.findOne({
      where: { id: content.id },
    });

    const result = [];

    classroom.timetable.forEach((item) => {
      if (item.id !== content.idTimeTable) result.push(item);
    });

    await this.classroomsRepository.update(
      { id: content.id },
      {
        timetable: result,
      },
    );
    return this.classroomsRepository.findOne({ where: { id: content.id } });
  }

  async clearRepo(): Promise<classRoom[]> {
    await this.classroomsRepository.clear();
    return this.classroomsRepository.find();
  }
}
