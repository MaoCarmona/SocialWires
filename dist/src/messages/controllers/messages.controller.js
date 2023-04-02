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
exports.MessageController = void 0;
const common_1 = require("@nestjs/common");
const JwtAuthGuard_1 = require("../../auth/guards/JwtAuthGuard");
const user_entity_1 = require("../../auth/entities/user.entity");
const create_message_dto_1 = require("../dto/create-message.dto");
const messages_service_1 = require("../services/messages.service");
const current_user_decorator_1 = require("../../auth/decorators/current-user.decorator");
const create_comment_dto_1 = require("../dto/create-comment.dto");
const create_reaction_dto_1 = require("../dto/create-reaction.dto");
let MessageController = class MessageController {
    constructor(messageService) {
        this.messageService = messageService;
    }
    async create(user, createMessageDto) {
        const { title, content } = createMessageDto;
        return await this.messageService.createMessage(user, title, content);
    }
    async findAll() {
        return await this.messageService.findAll();
    }
    async findAllByUser(user) {
        return await this.messageService.findAllByUser(user);
    }
    async findOneById(id) {
        const message = await this.messageService.findOneById({ where: { id } });
        return message;
    }
    async remove(id, user) {
        const isDeleted = await this.messageService.remove(id, user);
        return { delete: isDeleted, status: 'OK' };
    }
    async createComment(id, createCommentDto, req) {
        const userId = req.user.id;
        const message = await this.messageService.createComment(id, userId, createCommentDto.comment, createCommentDto.author);
        return message;
    }
    async createReaction(id, createReactionDto, req) {
        const userId = req.user.id;
        const message = await this.messageService.createReaction(id, userId, createReactionDto.reaction, createReactionDto.author);
        return message;
    }
};
__decorate([
    (0, common_1.UseGuards)(JwtAuthGuard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, create_message_dto_1.CreateMessageDto]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(JwtAuthGuard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(JwtAuthGuard_1.JwtAuthGuard),
    (0, common_1.Get)('/me'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "findAllByUser", null);
__decorate([
    (0, common_1.UseGuards)(JwtAuthGuard_1.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "findOneById", null);
__decorate([
    (0, common_1.UseGuards)(JwtAuthGuard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/comment'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_comment_dto_1.CreateCommentDto, Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "createComment", null);
__decorate([
    (0, common_1.Patch)(':id/reaction'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_reaction_dto_1.CreateReactionDto, Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "createReaction", null);
MessageController = __decorate([
    (0, common_1.Controller)('wires/messages'),
    __metadata("design:paramtypes", [messages_service_1.MessageService])
], MessageController);
exports.MessageController = MessageController;
//# sourceMappingURL=messages.controller.js.map