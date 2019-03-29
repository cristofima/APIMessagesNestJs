import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Res,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { CreateMessage } from '../dto/create-message';
import { MessagesService } from '../services/messages.service';

@Controller('api/messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Post()
  create(@Body() messageDto: CreateMessage, @Res() response) {
    this.messagesService
      .create(messageDto)
      .then(result => {
        response.status(HttpStatus.CREATED).json(result);
      })
      .catch(error => {
        response
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'Error in the register' });
      });
  }

  @Get()
  getAll(@Res() response) {
    this.messagesService
      .findAll()
      .then(result => {
        response.status(HttpStatus.OK).json(result);
      })
      .catch(error => {
        response
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'Error in the list' });
      });
  }

  @Get(':id')
  getById(@Param('id') id: number, @Res() response) {
    this.messagesService
      .findOne(id)
      .then(result => {
        if (result == null) {
          throw new HttpException(
            'Id ' + id + " doesn't exist",
            HttpStatus.NOT_FOUND,
          );
        } else {
          response.status(HttpStatus.OK).json(result);
        }
      })
      .catch(error => {
        response.status(error.status).json({ message: error.message });
      });
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() messageDto: CreateMessage,
    @Res() response,
  ) {
    this.messagesService
      .udapte(id, messageDto)
      .then(result => {
        response.status(HttpStatus.OK).json(result);
      })
      .catch(error => {
        response
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'Error in the upgrade' });
      });
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Res() response) {
    this.messagesService
      .delete(id)
      .then(result => {
        response.status(HttpStatus.NO_CONTENT).json();
      })
      .catch(error => {
        response
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'Error deleting the message' });
      });
  }
}
