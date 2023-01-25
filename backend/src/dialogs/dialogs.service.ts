import { Injectable } from '@nestjs/common';
import { Prisma, Dialog } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class DialogsService {
  constructor(private prisma: PrismaService) {}
  async dialog(
    dialogWhereUniqueInput: Prisma.DialogWhereUniqueInput,
  ): Promise<Dialog | null> {
    return this.prisma.dialog.findUnique({
      where: dialogWhereUniqueInput,
    });
  }

  async create(data: { name: string; userId: string }): Promise<Dialog> {
    const dialog = await this.prisma.dialog.create({
      data: {
        isPrivate: false,
        name: data.name,
      },
    });
    await this.prisma.dialogOnUsers.create({
      data: {
        dialogId: dialog.id,
        userId: +data.userId,
      },
    });

    return dialog;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.DialogWhereUniqueInput;
    where?: Prisma.DialogWhereInput;
    orderBy?: Prisma.DialogOrderByWithRelationInput;
  }): Promise<Dialog[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return await this.prisma.dialog.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} dialog`;
  }

  update(params: {
    where: Prisma.DialogWhereUniqueInput;
    data: Prisma.DialogUpdateInput;
  }): Promise<Dialog> {
    const { where, data } = params;
    return this.prisma.dialog.update({
      data,
      where,
    });
  }

  remove(where: Prisma.DialogWhereUniqueInput) {
    return this.prisma.dialog.delete({
      where,
    });
  }
}
