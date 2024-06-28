import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from 'src/post/entities/post.entity';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async getSuggestions(query: string) {
    const suggestions = await this.postRepository
      .createQueryBuilder('posts')
      .where('LOWER(posts.title) LIKE LOWER(:query)', { query: `%${query}%` })
      .getMany();

    return suggestions;
  }
}
