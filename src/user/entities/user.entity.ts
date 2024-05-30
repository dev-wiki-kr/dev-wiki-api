import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  githubId: string;

  @Column()
  username: string;

  @Column()
  displayName: string;

  @Column()
  profileUrl: string;

  @Column({ nullable: true })
  avartarUrl: string;
}
