import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { extname } from 'path';
import { CheckInService } from './check-in.service';
import { diskStorage } from 'multer';
import { checkInDto } from './dto/checkIn.dto';
@Controller('check-in')
export class CheckInController {
  constructor(private readonly checkInService: CheckInService) {}
  @ApiTags('User')
  @ApiBody({
    type: checkInDto,
  })
  @Post('/checkIn')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './files',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async addUser(@Body() req: checkInDto, @UploadedFiles() image) {
    try {
      const result = await this.checkInService.create(req, image);
      console.log('result', result);

      return result;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }
}
