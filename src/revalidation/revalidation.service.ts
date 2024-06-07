import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class RevalidationService {
  constructor(private readonly configService: ConfigService) {}

  async revalidatePath(path: string, isPage?: boolean): Promise<void> {
    const secret = this.configService.get('REVALIDATION_SECRET');
    let revalidateUrl = `${this.configService.get('CLIENT_URL')}/api/revalidate?secret=${secret}`;

    if (isPage) {
      revalidateUrl += '&type=page';
    }

    try {
      await axios.post(revalidateUrl, {
        path,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
