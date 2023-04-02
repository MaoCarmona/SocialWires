import { User } from './user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Message } from './message.entity';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => User)
  author: User;

  @ManyToOne(() => Message, (message) => message.comments, {onDelete: 'CASCADE'})
  message: Message;
}
