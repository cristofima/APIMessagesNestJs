import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesController } from './controllers/messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesService } from './services/messages.service';
import { Message } from './entities/message.entity';

@Module({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Message])],
  controllers: [AppController, MessagesController],
  providers: [AppService, MessagesService],
})
export class AppModule {}
