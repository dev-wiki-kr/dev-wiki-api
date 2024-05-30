import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { GithubProfile } from './auth.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async validateOAuthLogin(profile: GithubProfile) {
    let user = await this.userService.findUserById(profile.id);

    if (!user) {
      user = await this.userService.createUser(profile);
    }

    const payload = {
      githubId: user.githubId,
    };

    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });
  }
}
