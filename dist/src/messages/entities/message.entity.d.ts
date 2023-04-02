import { User } from 'src/auth/entities/user.entity';
import { Comments } from './comment.entity';
import { Reaction } from './reaction.entity';
export declare class Message {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    user: User;
    comments: Comments[];
    reactions: Reaction[];
}
