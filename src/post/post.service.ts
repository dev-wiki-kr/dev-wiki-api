import { SearchService } from './../search/search.service';
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
import { UserRole } from 'src/user-post/user-post.enum';
import { RevalidationService } from 'src/revalidation/revalidation.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly userService: UserService,
    @InjectRepository(UserPost)
    private readonly userPostRepository: Repository<UserPost>,
    private readonly revalidationService: RevalidationService,
    private readonly searchService: SearchService,
  ) {}

  async create(createPostDto: CreatePostDto) {
    try {
      const { title, shortTitle, userName, content } = createPostDto;

      console.log({ title, shortTitle, userName, content });

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
        role: UserRole.AUTHOR,
      });
      await this.userPostRepository.save(userPost);

      this.revalidationService.revalidatePath(`/post/[topic]`, true);
      this.searchService.indexPosts({ title, shortTitle, content });

      return newPost;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('존재하는 게시물 id입니다.');
      }

      console.log(err);

      throw new InternalServerErrorException();
    }
  }

  async update(updatePostDto: UpdatePostDto, shortTitle: string) {
    try {
      const post = await this.postRepository.findOne({
        where: { shortTitle },
        relations: ['user', 'user.user'],
      });

      post.title = updatePostDto.title;
      post.content = updatePostDto.content;

      const savedPost = await this.postRepository.save({
        ...post,
        user: undefined,
      });

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
          role: UserRole.EDITOR,
        });

        console.log(userPost);
        await this.userPostRepository.save(userPost);
      }

      this.revalidationService.revalidatePath(`/post/${shortTitle}`);
      this.searchService.indexPosts({
        title: updatePostDto.title,
        shortTitle,
        content: updatePostDto.content,
      });

      return savedPost;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('존재하는 게시물 id입니다.');
      }

      console.log(err);

      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    return await this.postRepository.find();
  }

  async findOne(shortTitle: string) {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .where('post.shortTitle = :shortTitle', { shortTitle })
      .leftJoinAndSelect('post.user', 'userPost')
      .leftJoinAndSelect('userPost.user', 'user')
      .getOne();

    if (!post) {
      throw new NotFoundException('게시물을 찾지 못했습니다.');
    }

    const transformedPost = {
      ...post,
      user: post.user.map((userPost) => ({
        id: userPost.user.id,
        githubId: userPost.user.githubId,
        username: userPost.user.username,
        displayName: userPost.user.displayName,
        profileUrl: userPost.user.profileUrl,
        avartarUrl: userPost.user.avartarUrl,
        role: userPost.role,
      })),
    };

    return transformedPost;
  }

  async findAllPostTitle() {
    try {
      const titles = await this.postRepository
        .createQueryBuilder('post')
        .select('post.shortTitle')
        .getMany();

      return titles;
    } catch (err) {
      console.log(err);

      throw new InternalServerErrorException();
    }
  }

  async findLatestPosts(count: number = 10) {
    try {
      const latestPosts = await this.postRepository
        .createQueryBuilder('post')
        .orderBy('post.createdAt', 'DESC')
        .take(count)
        .getMany();

      return latestPosts.map((post) => {
        return {
          url: `https://devwiki.co.kr/post/${post.shortTitle}`,
          title: post.title,
        };
      });
    } catch (err) {
      console.log(err);

      throw new InternalServerErrorException();
    }
  }
}
