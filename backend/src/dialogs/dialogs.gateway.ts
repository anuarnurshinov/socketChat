import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Prisma, Message } from '@prisma/client';
import { Server } from 'http';
import { DialogsService } from './dialogs.service';
import { MessagesService } from './messages/messages.service';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
})
export class DialogsGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly DialogsService: DialogsService) {}

  @SubscribeMessage('createDialog')
  async create(
    @MessageBody() { name, userId }: { name: string; userId: string },
  ) {
    const result = await this.DialogsService.create({ name, userId });
    if (result) {
      this.server.emit('dialogCreated', { ...result, userId });
    }
  }

  @SubscribeMessage('findAllDialogs')
  async findAll(@MessageBody() userId: number) {
    const result = await this.DialogsService.findAll({});

    this.server.emit('foundAllDialogs', result);
  }

  @SubscribeMessage('findOneDialog')
  findOne(@MessageBody() id: number) {
    return this.DialogsService.findOne(id);
  }

  @SubscribeMessage('updateDialog')
  update(
    @MessageBody()
    params: {
      where: Prisma.DialogWhereUniqueInput;
      data: Prisma.DialogUpdateInput;
    },
  ) {
    return this.DialogsService.update(params);
  }

  @SubscribeMessage('removeDialog')
  remove(@MessageBody() where: Prisma.DialogWhereUniqueInput) {
    return this.DialogsService.remove(where);
  }
}
