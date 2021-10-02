import { FeedPost } from './../models/post.interface';
import { FeedPostEntity } from './../models/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedPostEntity)
    private readonly feedPostRepository: Repository<FeedPostEntity>,
  ) {}

  createPost(feedPost: FeedPost): Observable<FeedPost> {
    return from(this.feedPostRepository.save(feedPost));
  }

  async findAllPosts(): Promise<FeedPost> {
    const data = await this.feedPostRepository.findOne({ id: 2 });
    console.log(data);

    return this.feedPostRepository.findOne({ id: 2 });
  }

  // async findAllPosts() {
  //   return this.feedPostRepository.find();
  // }
}
