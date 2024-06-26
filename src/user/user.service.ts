import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { GithubProfile } from 'src/auth/auth.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async createUser(profile: GithubProfile) {
    try {
      const { id, username, displayName, profileUrl, photos } = profile;

      const user = this.userRepository.create({
        githubId: id,
        username,
        displayName,
        profileUrl,
        avartarUrl: photos[0].value,
      });

      this.userRepository.save(user);

      return user;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }

  async findUserById(id: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { githubId: id },
      });

      return user;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async findUserByUserName(userName: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { username: userName },
      });

      return user;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async getUserProfile(accessToken: string) {
    try {
      const jwt = this.jwtService.verify(accessToken, {
        secret: this.configService.get('JWT_SECRET_KEY'),
      });

      const user = await this.findUserById(jwt.githubId);

      return user;
    } catch {
      throw new HttpException('invalid access token', HttpStatus.UNAUTHORIZED);
    }
  }
}
