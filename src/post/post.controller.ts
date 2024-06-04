import { UpdatePostDto } from './dto/update-post.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ValidationPipe,
  Patch,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(@Body(ValidationPipe) createPostDto: CreatePostDto) {
    return await this.postService.create(createPostDto);
  }

  @Get()
  async findAll() {
    return await this.postService.findAll();
  }

  @Get(':shortTitle')
  async findOne(@Param('shortTitle') shortTitle: string) {
    return await this.postService.findOne(shortTitle);
  }

  @Patch(':shortTitle')
  async update(
    @Body(ValidationPipe) updatePostDto: UpdatePostDto,
    @Param('shortTitle') shortTitle: string,
  ) {
    return await this.postService.update(updatePostDto, shortTitle);
  }
}
