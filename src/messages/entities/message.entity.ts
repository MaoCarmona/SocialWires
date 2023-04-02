import { User } from 'src/auth/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Comments } from './comment.entity';
import { Reaction } from './reaction.entity';


@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, user => user.messages)
  user: User;

  @OneToMany(() => Comments, comment => comment.message, { cascade: true })
  comments: Comments[];

  @OneToMany(() => Reaction, reaction => reaction.message, { cascade: true })
  reactions: Reaction[];
}
