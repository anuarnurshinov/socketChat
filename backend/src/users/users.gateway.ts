import { UseGuards } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Prisma } from '@prisma/client';
import { Server } from 'http';
import { UsersService } from './users.service';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
})
export class UsersGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly usersService: UsersService) {}

  @SubscribeMessage('findAllUsers')
  findAll() {
    return this.usersService.findAll({});
  }

  @SubscribeMessage('findOneUser')
  findOne(@MessageBody() id: number) {
    return this.usersService.findOne(id);
  }

  @SubscribeMessage('updateUser')
  update(
    @MessageBody()
    params: {
      where: Prisma.UserWhereUniqueInput;
      data: Prisma.UserUpdateInput;
    },
  ) {
    return this.usersService.update(params);
  }

  @SubscribeMessage('removeUser')
  remove(@MessageBody() where: Prisma.UserWhereUniqueInput) {
    return this.usersService.remove(where);
  }
}
