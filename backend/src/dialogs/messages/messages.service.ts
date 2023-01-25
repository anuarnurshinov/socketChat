import { Injectable } from '@nestjs/common';
import { Prisma, Message } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}
  async message(
    messageWhereUniqueInput: Prisma.MessageWhereUniqueInput,
  ): Promise<Message | null> {
    return this.prisma.message.findUnique({
      where: messageWhereUniqueInput,
    });
  }

  async create(data: Prisma.MessageCreateInput): Promise<Message> {
    return await this.prisma.message.create({
      data,
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MessageWhereUniqueInput;
    where?: Prisma.MessageWhereInput;
    orderBy?: Prisma.MessageOrderByWithRelationInput;
  }): Promise<Message[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return await this.prisma.message.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(params: {
    where: Prisma.MessageWhereUniqueInput;
    data: Prisma.MessageUpdateInput;
  }): Promise<Message> {
    const { where, data } = params;
    return this.prisma.message.update({
      data,
      where,
    });
  }

  remove(where: Prisma.MessageWhereUniqueInput) {
    return this.prisma.message.delete({
      where,
    });
  }
}
