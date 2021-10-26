import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from 'src/NonModule/entity/Review.Entity';
import {
  newReview,
  review,
  editReview,
} from 'src/NonModule/interface/review.interface';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private reviewsRepository: Repository<ReviewEntity>,
  ) {}

  async create(content: newReview): Promise<review[]> {
    await this.reviewsRepository.save(content);
    return this.reviewsRepository.find();
  }

  async edit(content: editReview): Promise<review> {
    await this.reviewsRepository.update(
      { id: content.id },
      {
        note: content.note,
        rating: content.rating,
      },
    );
    return this.reviewsRepository.findOne({ where: { id: content.id } });
  }

  async getById(id: number): Promise<review> {
    return this.reviewsRepository.findOne({ where: { id } });
  }

  async getAll(): Promise<review[]> {
    return this.reviewsRepository.find();
  }

  async deleteById(id: number): Promise<review[]> {
    await this.reviewsRepository.delete({ id });
    return this.reviewsRepository.find();
  }
}
