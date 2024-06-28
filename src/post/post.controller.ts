import { UpdatePostDto } from './dto/update-post.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ValidationPipe,
  Patch,
  Query,
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

  @Get('titles')
  async getAllPostTitle() {
    return await this.postService.findAllPostTitle();
  }

  @Get('latest')
  async findLatest(@Query('count') count: number) {
    return await this.postService.findLatestPosts(count);
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
