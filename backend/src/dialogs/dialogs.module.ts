import { Module } from '@nestjs/common';
import { DialogsService } from './dialogs.service';
import { DialogsGateway } from './dialogs.gateway';
import { PrismaService } from 'prisma/prisma.service';
import { MessagesModule } from './messages/messages.module';
import { MessagesService } from './messages/messages.service';

@Module({
  providers: [DialogsGateway, DialogsService, PrismaService],
  imports: [MessagesModule],
})
export class DialogsModule {}
