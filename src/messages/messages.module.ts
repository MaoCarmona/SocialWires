import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { Message } from '../entities/message.entity';
import { Reaction } from '../entities/reaction.entity';
import { UserController } from '../auth/controllers/user.controller';
import { MessageController } from './controllers/messages.controller';
import { MessageService } from './services/messages.service';
import { User } from '../entities/user.entity';
import { UserService } from '../auth/services/user.service';
import { Comments } from '../entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, User, Reaction, Comments]),
    AuthModule,
  ],
  controllers: [UserController, MessageController],
  providers: [MessageService, UserService],
})
export class MessageModule {}
