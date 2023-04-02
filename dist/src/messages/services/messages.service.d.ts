import { User } from '../../auth/entities/user.entity';
import { Message } from '../entities/message.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { Reaction } from '../entities/reaction.entity';
import { Comments } from '../entities/comment.entity';
export declare class MessageService {
    private readonly messageRepository;
    private readonly userRepository;
    private readonly commentRepository;
    private readonly reactionRepository;
    constructor(messageRepository: Repository<Message>, userRepository: Repository<User>, commentRepository: Repository<Comments>, reactionRepository: Repository<Reaction>);
    createMessage(user: User, title: string, content: string): Promise<Message>;
    findAll(): Promise<Message[]>;
    findAllByUser(user: User): Promise<Message[]>;
    findOneById(options: FindOneOptions<Message>): Promise<Message>;
    remove(id: number, user: User): Promise<boolean>;
    createComment(messageId: number, userId: string, content: string, author: string): Promise<Message>;
    createReaction(messageId: number, userId: string, reaction: string, author: string): Promise<Message>;
}
