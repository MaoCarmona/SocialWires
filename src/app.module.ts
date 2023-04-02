import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './auth/user/user.module';
import { User } from './entities/user.entity';
import { MessageModule } from './messages/messages.module';
import { Message } from './entities/message.entity';
import { Comments } from './entities/comment.entity';
import { Reaction } from './entities/reaction.entity';


@Module({
  imports: [
    ConfigModule.forRoot(), // carga la configuración de variables de entorno
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'socialwire',
      entities: [User,Message,Comments,Reaction],
      synchronize :true
    }), // configura la conexión a la base de datos
    AuthModule, UserModule, MessageModule, // importa el módulo de autenticación y de usuario
  ],
})
export class AppModule {}
