import { Message } from 'src/messages/entities/message.entity';
export declare class User {
    id: string;
    username: string;
    email: string;
    password: string;
    fullname: string;
    createdAt: Date;
    messages: Message[];
}
