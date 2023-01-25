import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGateway } from './auth.gateway';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaService } from 'prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      signOptions: {
        expiresIn: '60s',
      },
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [AuthGateway, AuthService, JwtStrategy, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
