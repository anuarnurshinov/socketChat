import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersGateway } from './users.gateway';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [UsersGateway, UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
