import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  newReview,
  editReview,
} from 'src/NonModule/interface/review.interface';
import { ReviewsService } from 'src/reviews/reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post('/create')
  create(@Body('content') content: newReview) {
    return this.reviewsService.create(content);
  }

  @Post('/edit')
  edit(@Body('content') content: editReview) {
    return this.reviewsService.edit(content);
  }

  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.reviewsService.deleteById(id);
  }

  @Get()
  getAllCourses() {
    return this.reviewsService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.reviewsService.getById(id);
  }

  @Delete()
  clearRepo() {
    return this.reviewsService.clearRepo();
  }

  @Get('/class/:id')
  getByClass(@Param('id') id: number) {
    return this.reviewsService.getByClass(id);
  }
}
