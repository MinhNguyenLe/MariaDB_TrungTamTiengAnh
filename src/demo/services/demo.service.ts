import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { TestLoginEntity } from '../models/login.entity';
import { TestLogin } from '../models/login.interface';

@Injectable()
export class DemoService {
  // constructor(
  //   @InjectRepository(TestLoginEntity)
  //   private readonly TestLoginEntity: Repository<TestLoginEntity>,
  // ) {}
  // login(testLogin : TestLogin){
  // }
}
