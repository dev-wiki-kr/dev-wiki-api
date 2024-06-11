import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUserProfile(@Req() req: Request) {
    const accessToken = req.cookies['auth_token'];

    if (!accessToken) {
      throw new HttpException(
        'access token이 존재하지 않습니다.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      return this.userService.getUserProfile(accessToken);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get(':userName')
  async getUserByUserName(@Param('userName') userName: string) {
    try {
      return this.userService.findUserByUserName(userName);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
