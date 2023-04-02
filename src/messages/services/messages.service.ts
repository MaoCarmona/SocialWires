import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../auth/entities/user.entity';
import { Message } from '../entities/message.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { Reaction } from '../entities/reaction.entity';
import * as emoji from 'node-emoji'
import { Comments } from '../entities/comment.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comments>,
    @InjectRepository(Reaction)
    private readonly reactionRepository: Repository<Reaction>,
  ) {}

  async createMessage(user: User, title: string, content: string): Promise<Message> {
    const message = this.messageRepository.create({
      user,
      title,
      content,
      comments: [],
      reactions: [],
    });

    return await this.messageRepository.save(message);
  }

  async findAll(): Promise<Message[]> {
    return await this.messageRepository.find();
  }

  async findAllByUser(user: User): Promise<Message[]> {
    return await this.messageRepository.find({ where: { user } });
  }

  async findOneById(options: FindOneOptions<Message>): Promise<Message> {
    const message = await this.messageRepository.findOne(options);
    if (!message) {
      throw new NotFoundException(`Message not found`);
    }
    return message;
  }
  

  async remove(id: number, user: User): Promise<boolean> {
    const message = await this.findOneById({ where: { id } });
    if (message.user.id !== user.id) {
      throw new UnauthorizedException('You are not authorized to delete this message');
    }
    const result = await this.messageRepository.delete(id);
    return result.affected > 0;
  }

  async createComment(
    messageId: number,
    userId: string,
    content: string,
    author: string,
  ): Promise<Message> {
    const message = await this.findOneById({where :{id:messageId}});
    if (message.user.id === userId) {
      throw new ForbiddenException('You cannot comment on your own messages');
    }
    const newComment = this.commentRepository.create({
      content,
      author:{},
      message,
    });
    await this.commentRepository.save(newComment);
    message.comments.push(newComment);
    await this.messageRepository.save(message);
    return message;
  }

  async createReaction(
    messageId: number,
    userId: string,
    reaction: string,
    author: string,
  ): Promise<Message> {
    const message = await this.findOneById({where :{id:messageId}});
    if (message.user.id === userId) {
      throw new ForbiddenException('You cannot react to your own messages');
    }
    // Convertir el emoji en su código ASCII
    const asciiCode = emoji.emojify(reaction).codePointAt(0).toString(16);
    const newReaction = this.reactionRepository.create({
      type : `U+${asciiCode}`,
      author:{},
      message,
    });
    await this.reactionRepository.save(newReaction);
    message.reactions.push(newReaction);
    await this.messageRepository.save(message);
    return message;
  }


}
