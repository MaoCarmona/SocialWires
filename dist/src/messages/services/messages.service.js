"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../auth/entities/user.entity");
const message_entity_1 = require("../entities/message.entity");
const typeorm_2 = require("typeorm");
const reaction_entity_1 = require("../entities/reaction.entity");
const emoji = require("node-emoji");
let MessageService = class MessageService {
    constructor(messageRepository, userRepository, commentRepository, reactionRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
        this.reactionRepository = reactionRepository;
    }
    async createMessage(user, title, content) {
        const message = this.messageRepository.create({
            user,
            title,
            content,
            comments: [],
            reactions: [],
        });
        return await this.messageRepository.save(message);
    }
    async findAll() {
        return await this.messageRepository.find();
    }
    async findAllByUser(user) {
        return await this.messageRepository.find({ where: { user } });
    }
    async findOneById(options) {
        const message = await this.messageRepository.findOne(options);
        if (!message) {
            throw new common_1.NotFoundException(`Message not found`);
        }
        return message;
    }
    async remove(id, user) {
        const message = await this.findOneById({ where: { id } });
        if (message.user.id !== user.id) {
            throw new common_1.UnauthorizedException('You are not authorized to delete this message');
        }
        const result = await this.messageRepository.delete(id);
        return result.affected > 0;
    }
    async createComment(messageId, userId, content, author) {
        const message = await this.findOneById({ where: { id: messageId } });
        if (message.user.id === userId) {
            throw new common_1.ForbiddenException('You cannot comment on your own messages');
        }
        const newComment = this.commentRepository.create({
            content,
            author: {},
            message,
        });
        await this.commentRepository.save(newComment);
        message.comments.push(newComment);
        await this.messageRepository.save(message);
        return message;
    }
    async createReaction(messageId, userId, reaction, author) {
        const message = await this.findOneById({ where: { id: messageId } });
        if (message.user.id === userId) {
            throw new common_1.ForbiddenException('You cannot react to your own messages');
        }
        const asciiCode = emoji.emojify(reaction).codePointAt(0).toString(16);
        const newReaction = this.reactionRepository.create({
            type: `U+${asciiCode}`,
            author: {},
            message,
        });
        await this.reactionRepository.save(newReaction);
        message.reactions.push(newReaction);
        await this.messageRepository.save(message);
        return message;
    }
};
MessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_entity_1.Message)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(Comment)),
    __param(3, (0, typeorm_1.InjectRepository)(reaction_entity_1.Reaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=messages.service.js.map