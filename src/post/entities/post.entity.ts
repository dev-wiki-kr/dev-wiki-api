import { UserPost } from './../../user-post/entities/user-post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  shortTitle: string;

  @Column()
  title: string;

  /** 컨텐츠의 길이에 제한이 없음. */
  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => UserPost, (userPost) => userPost.post)
  user: UserPost[];
}
