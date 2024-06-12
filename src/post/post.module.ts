import { RevalidationModule } from './../revalidation/revalidation.modue';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post } from './entities/post.entity';
import { UserPost } from 'src/user-post/entities/user-post.entity';
import { UserModule } from 'src/user/user.module';
import { SearchModule } from 'src/search/search.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [
    TypeOrmModule.forFeature([Post]),
    TypeOrmModule.forFeature([UserPost]),
    UserModule,
    RevalidationModule,
    SearchModule,
  ],
})
export class PostModule {}
