import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    try {
      const newPost = this.postRepository.create(createPostDto);
      await this.postRepository.insert(newPost);

      return newPost;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('존재하는 게시물 id입니다.');
      }

      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    return await this.postRepository.find();
  }

  async findOne(shortTitle: string) {
    const post = await this.postRepository.findOneBy({ shortTitle });

    if (!post) {
      throw new NotFoundException('게시물을 찾지 못했습니다.');
    }

    return post;
  }
}