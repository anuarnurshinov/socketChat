import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Prisma } from '@prisma/client';
import { Server } from 'http';
import { AuthService } from './auth.service';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
})
export class AuthGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly authService: AuthService) {}
  @SubscribeMessage('loginUser')
  async login(@MessageBody() data: Prisma.UserCreateInput) {
    const user = await this.authService.login(data);

    if (user.access_token) {
      this.server.emit('loginSuccess', user);
    }
  }
  @SubscribeMessage('createUser')
  async create(@MessageBody() data: Prisma.UserCreateInput) {
    const user = await this.authService.create(data);
    this.server.emit('userCreated', user);
  }
  @SubscribeMessage('isValidToken')
  async verify(@MessageBody() cookie: string) {
    const user = await this.authService.verifyCookie(cookie);
    this.server.emit('tokenResponse', user);
  }
}
