import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UploadsService {
  constructor(private readonly configService: ConfigService) {}

  private s3 = new S3({
    accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    region: this.configService.get('AWS_REGION'),
  });

  private BUCKET_NAME = this.configService.get('AWS_BUCKET_NAME');
  private CLOUDFRONT_URL = this.configService.get('AWS_CLOUDFRONT_URL');

  async uploadFile(image: Express.Multer.File) {
    const ext = image.originalname.split('.').pop();
    const fileName = `${uuid()}/image.${ext}`;

    const params = {
      Bucket: this.BUCKET_NAME,
      Key: `uploads/${fileName}`,
      Body: image.buffer,
      ContentType: image.mimetype,
      ACL: 'public-read',
    };

    const uploadResult = await this.s3.upload(params).promise();
    return {
      s3Url: uploadResult.Location,
      cloudFrontUrl: `${this.CLOUDFRONT_URL}/uploads/${fileName}`,
    };
  }
}
