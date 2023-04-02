import { User } from 'src/auth/entities/user.entity';
import { CreateMessageDto } from '../dto/create-message.dto';
import { MessageService } from '../services/messages.service';
import { Message } from '../entities/message.entity';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CreateReactionDto } from '../dto/create-reaction.dto';
export declare class MessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    create(user: User, createMessageDto: CreateMessageDto): Promise<Message>;
    findAll(): Promise<Message[]>;
    findAllByUser(user: User): Promise<Message[]>;
    findOneById(id: number): Promise<Message>;
    remove(id: number, user: User): Promise<{
        delete: boolean;
        status: string;
    }>;
    createComment(id: number, createCommentDto: CreateCommentDto, req: any): Promise<Message>;
    createReaction(id: number, createReactionDto: CreateReactionDto, req: any): Promise<Message>;
}
