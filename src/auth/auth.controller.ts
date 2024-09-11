import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './user.decorator';
import { ConfigService } from '@nestjs/config';

@Controller('oauth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('github'))
  async githubAuth(@Req() req) {}

  @Get('/callback')
  @UseGuards(AuthGuard('github'))
  async githubAuthRedirect(@CurrentUser() user, @Res() res) {
    const jwt = user.jwt;

    res.cookie('auth_token', jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 36000000, // 30분
      sameSite: 'strict',
    });

    res.redirect(this.configService.get('CLIENT_URL'));
  }
}
