import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth/auth.guard';
import { IUserRepository } from './interfaces/user.repository.interface';
import { JsonUserRepository } from './repositories/json-user.repository';
import { ProtectedController } from './auth/protected.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '3600s' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController, ProtectedController],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: 'AUTH_GUARD',
      useClass: AuthGuard,
    },
    {
      provide: 'USER_REPOSITORY',
      useClass: JsonUserRepository, // Тут ти можеш змінити на інший репозиторій
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}