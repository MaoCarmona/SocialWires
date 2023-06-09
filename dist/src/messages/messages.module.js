"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const message_entity_1 = require("./entities/message.entity");
const reaction_entity_1 = require("./entities/reaction.entity");
const user_controller_1 = require("../auth/controllers/user.controller");
const messages_controller_1 = require("./controllers/messages.controller");
const messages_service_1 = require("./services/messages.service");
const user_entity_1 = require("../auth/entities/user.entity");
const user_service_1 = require("../auth/services/user.service");
let MessageModule = class MessageModule {
};
MessageModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([message_entity_1.Message, user_entity_1.User, reaction_entity_1.Reaction, Comment]),
            auth_module_1.AuthModule,
        ],
        controllers: [user_controller_1.UserController, messages_controller_1.MessageController],
        providers: [messages_service_1.MessageService, user_service_1.UserService],
    })
], MessageModule);
exports.MessageModule = MessageModule;
//# sourceMappingURL=messages.module.js.map