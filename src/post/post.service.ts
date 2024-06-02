import { UpdatePostDto } from './dto/update-post.dto';
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
import { UserService } from 'src/user/user.service';
import { UserPost } from 'src/user-post/entities/user-post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    @InjectRepository(UserPost)
    private readonly postRepository: Repository<Post>,
    private readonly userService: UserService,
    private readonly userPostRepository: Repository<UserPost>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    try {
      const { title, shortTitle, userName, content } = createPostDto;

      const user = await this.userService.findUserByUserName(userName);
      if (!user) {
        throw new NotFoundException('유저 정보를 찾지 못했습니다.');
      }

      const newPost = this.postRepository.create({
        content,
        shortTitle,
        title,
      });
      const savedPost = await this.postRepository.save(newPost);

      const userPost = this.userPostRepository.create({
        user,
        post: savedPost,
        role: 'author',
      });
      await this.userPostRepository.save(userPost);

      return newPost;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('존재하는 게시물 id입니다.');
      }

      throw new InternalServerErrorException();
    }
  }

  async update(updatePostDto: UpdatePostDto, shortTitle: string) {
    try {
      const post = await this.findOne(shortTitle);

      post.title = updatePostDto.title;
      post.content = updatePostDto.content;

      if (
        !post.user.some(
          (userPost) => userPost.user.username === updatePostDto.editor,
        )
      ) {
        const user = await this.userService.findUserByUserName(
          updatePostDto.editor,
        );

        const userPost = this.userPostRepository.create({
          user,
          post,
          role: 'editor',
        });

        await this.userPostRepository.save(userPost);
      }

      return this.postRepository.save(post);
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
