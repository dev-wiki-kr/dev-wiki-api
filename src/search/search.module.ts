import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { OpensearchModule } from 'nestjs-opensearch';

@Module({
  controllers: [SearchController],
  imports: [
    OpensearchModule.forRootAsync({
      imports: [ConfigModule],
      clientName: 'posts',
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('OPENSEARCH_URL'),
        auth: {
          username: configService.get('OPENSEARCH_USERNAME'),
          password: configService.get('OPENSEARCH_PASSWORD'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
