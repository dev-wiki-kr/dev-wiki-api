import { UserPost } from './../../user-post/entities/user-post.entity';
import { Post } from 'src/post/entities/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  githubId: string;

  @Column({ unique: true })
  username: string;

  @Column()
  displayName: string;

  @Column()
  profileUrl: string;

  @Column({ nullable: true })
  avartarUrl: string;

  @OneToMany(() => UserPost, (userPost) => userPost.user)
  post: UserPost[];
}
