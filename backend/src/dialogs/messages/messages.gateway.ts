import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Prisma } from '@prisma/client';
import { Server } from 'http';
import { MessagesService } from './messages.service';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly MessagesService: MessagesService) {}

  @SubscribeMessage('createMessage')
  async create(@MessageBody() data: Prisma.MessageCreateInput) {
    const message = await this.MessagesService.create(data);
    this.server.emit('newMessage', message);
  }

  @SubscribeMessage('findAllMessages')
  async findAll(@MessageBody() dialogId: number) {
    if (dialogId) {
      const messages = await this.MessagesService.findAll({
        where: {
          dialogId,
        },
      });
      this.server.emit('foundAllMessages', messages);
    }
  }

  @SubscribeMessage('findOneMessage')
  findOne(@MessageBody() id: number) {
    return this.MessagesService.findOne(id);
  }

  @SubscribeMessage('updateMessage')
  update(
    @MessageBody()
    params: {
      where: Prisma.MessageWhereUniqueInput;
      data: Prisma.MessageUpdateInput;
    },
  ) {
    return this.MessagesService.update(params);
  }

  @SubscribeMessage('removeMessage')
  remove(@MessageBody() where: Prisma.MessageWhereUniqueInput) {
    return this.MessagesService.remove(where);
  }
}
