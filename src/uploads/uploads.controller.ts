import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      limits: {
        fileSize: 1024 * 1024 * 1, // 10MB
      },
      fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|webp|avif|svg)$/)) {
          return callback(
            new HttpException(
              '이미지가 아닌 파일은 업로드할 수 없습니다.',
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async uploadFile(@UploadedFile() image: Express.Multer.File) {
    if (!image) {
      throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
    }

    return await this.uploadsService.uploadFile(image);
  }
}
