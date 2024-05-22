import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body(ValidationPipe) createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':shortTitle')
  findOne(@Param('shortTitle') shortTitle: string) {
    return this.postService.findOne(shortTitle);
  }
}
