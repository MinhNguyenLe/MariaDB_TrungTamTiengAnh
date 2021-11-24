import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import {
  newComment,
  commentType,
  editComment,
} from 'src/NonModule/interface/comment.interface';
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Post('/create')
  create(@Body('content') content: newComment) {
    return this.commentService.create(content);
  }

  @Post('/edit')
  edit(@Body('content') content: editComment) {
    return this.commentService.edit(content);
  }

  @Get()
  getAll() {
    return this.commentService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.commentService.getById(id);
  }

  @Get('/noti/:id')
  getByIdNoti(@Param('id') id: number) {
    return this.commentService.getByIdNoti(id);
  }

  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.commentService.deleteById(id);
  }

  @Delete()
  clearRepo() {
    return this.commentService.clearRepo();
  }
}
