import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }
  async validateUser(name: string, pass: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        name,
      },
    });

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login({ name, password }: Prisma.UserCreateInput) {
    const user = await this.validateUser(name, password);
    const payload = { name, id: user.id };
    const result = this.jwtService.sign(payload);

    return {
      ...user,
      access_token: result,
    };
  }
  async verifyCookie(cookie: string): Promise<User | null> {
    const result = this.jwtService.decode(cookie) as {
      id: number;
      name: string;
    };
    if (result) {
      const user = this.prisma.user.findUnique({
        where: {
          id: result.id,
        },
      });
      return user;
    }
    return null;
  }
}
