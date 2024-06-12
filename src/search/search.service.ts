import { CreatePostDto } from './../post/dto/create-post.dto';
import { Injectable } from '@nestjs/common';
import { OpensearchClient, InjectOpensearchClient } from 'nestjs-opensearch';
import { ApiResponse } from '@opensearch-project/opensearch';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SearchService {
  constructor(
    private readonly configService: ConfigService,
    @InjectOpensearchClient('posts')
    private readonly opensearchService: OpensearchClient,
  ) {}

  async indexPosts(
    post: Omit<CreatePostDto, 'userName'>,
  ): Promise<ApiResponse> {
    const data = await this.opensearchService.index(
      {
        index: this.configService.get('SEARCH_INDEX'),
        id: post.shortTitle,
        body: {
          title: post.title,
          content: post.content,
        },
      },
      { headers: { 'content-type': 'application/json' } },
    );

    return data;
  }

  async suggestTitles(query: string) {
    const body = await this.opensearchService.search({
      index: this.configService.get('SEARCH_INDEX'),
      body: {
        suggest: {
          autocomplete: {
            prefix: query,
            completion: {
              field: 'title',
              size: 10,
              fuzzy: {
                fuzziness: 'AUTO',
              },
            },
          },
        },
      },
    });

    return body;
  }
}
