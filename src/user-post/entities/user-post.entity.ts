import { Post } from 'src/post/entities/post.entity';
import { User } from './../../user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserRole } from '../user-post.enum';

@Entity('user_post')
export class UserPost {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  postId: number;

  @ManyToOne(() => User, (user) => user.post)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Post, (post) => post.user)
  @JoinColumn({ name: 'postId', referencedColumnName: 'id' })
  post: Post;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;
}
