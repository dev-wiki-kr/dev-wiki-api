import { UserModule } from './../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { GithubStrategy } from './auth.strategy';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'github' }),
    /** module에서와 같이 service 객체에 접근이 어려울때는 useFactory를 이용한다
     * 이것은 registerAsync에서만 가능
     */
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '30m' },
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, GithubStrategy],
})
export class AuthModule {}
