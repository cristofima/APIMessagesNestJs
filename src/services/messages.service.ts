import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/entities/message.entity';
import { Repository } from 'typeorm';
import { CreateMessage } from 'src/dto/create-message';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async findAll(): Promise<Message[]> {
    return await this.messageRepository.find();
  }

  async findOne(id: number): Promise<Message> {
    return await this.messageRepository.findOne(id);
  }

  async create(messageDto: CreateMessage): Promise<Message> {
    const msg = new Message();
    msg.message = messageDto.message;
    msg.nick = messageDto.nick;

    return await this.messageRepository.save(msg);
  }

  async udapte(id: number, messageDto: CreateMessage): Promise<Message> {
    const msg = await this.messageRepository.findOne(id);
    msg.message = messageDto.message;
    msg.nick = messageDto.nick;

    return await this.messageRepository.save(msg);
  }

  async delete(id: number): Promise<any> {
    return await this.messageRepository.delete(id);
  }
}
