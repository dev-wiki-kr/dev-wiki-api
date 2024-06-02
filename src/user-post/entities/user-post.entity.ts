import { Post } from 'src/post/entities/post.entity';
import { User } from './../../user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user_post')
export class UserPost {
  @PrimaryGeneratedColumn()
  userId: number;

  @PrimaryGeneratedColumn()
  postId: number;

  @ManyToOne(() => User, (user) => user.post)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Post, (post) => post.user)
  @JoinColumn({ name: 'postId', referencedColumnName: 'id' })
  post: Post;

  @Column()
  role: 'author' | 'editor';
}
