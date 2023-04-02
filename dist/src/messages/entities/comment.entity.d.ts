import { User } from 'src/auth/entities/user.entity';
import { Message } from './message.entity';
export declare class Comments {
    id: number;
    content: string;
    author: User;
    message: Message;
}
