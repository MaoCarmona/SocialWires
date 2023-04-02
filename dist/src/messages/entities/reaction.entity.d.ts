import { User } from 'src/auth/entities/user.entity';
import { Message } from './message.entity';
export declare class Reaction {
    id: number;
    type: string;
    author: User;
    message: Message;
}
