import {  Body,Controller,Delete,ForbiddenException,Get,Param,Patch,Post,Req,UseGuards,UseInterceptors,} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/JwtAuthGuard';
import { User } from 'src/auth/entities/user.entity';
import { CreateMessageDto } from '../dto/create-message.dto';
import { MessageService } from '../services/messages.service';
import { Message } from '../entities/message.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CreateReactionDto } from '../dto/create-reaction.dto';

@Controller('wires/messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@CurrentUser() user: User, @Body() createMessageDto: CreateMessageDto): Promise<Message> {
    const { title, content } = createMessageDto;
    return await this.messageService.createMessage(user, title, content);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Message[]> {
    return await this.messageService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async findAllByUser(@CurrentUser() user: User): Promise<Message[]> {
    return await this.messageService.findAllByUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
async findOneById(@Param('id') id: number): Promise<Message> {
  const message = await this.messageService.findOneById({ where: { id } });
  return message;
}

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @CurrentUser() user: User): Promise<{ delete: boolean; status: string }> {
    const isDeleted = await this.messageService.remove(id, user);
    return { delete: isDeleted, status: 'OK' };
  }

  @Patch(':id/comment')
  async createComment(
    @Param('id') id: number,
    @Body() createCommentDto: CreateCommentDto,
    @Req() req: any,
  ): Promise<Message> {
    const userId = req.user.id;
    const message = await this.messageService.createComment(
      id,
      userId,
      createCommentDto.comment,
      createCommentDto.author,
    );
    return message;
  }

  @Patch(':id/reaction')
  async createReaction(
    @Param('id') id: number,
    @Body() createReactionDto: CreateReactionDto,
    @Req() req: any,
  ): Promise<Message> {
    const userId = req.user.id;
    const message = await this.messageService.createReaction(
      id,
      userId,
      createReactionDto.reaction,
      createReactionDto.author,
    );
    return message;
  }
}
