import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { extname } from 'path';
import { CheckInService } from './check-in.service';
import { diskStorage } from 'multer';
import { checkInDto } from './dto/checkIn.dto';
import { locationPointDto } from './dto/locationPoint.dto';
@Controller('check-in')
export class CheckInController {
  constructor(private readonly checkInService: CheckInService) {}
  
  @Post('/checkIn')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'profilePic' }, { name: 'capturedPhotos' }, { name: 'images' }]),
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

  @Get('/getcheckIn')
  async checkInGet() {
    try {
      const result = await this.checkInService.getcheckIn();
      return result;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  @Post('/deletecheckIn')
  async checkIndel(@Body() req: checkInDto) {
    try {
      const resdel = await this.checkInService.deletecheckIn(req);
      return resdel;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  // @Post('/checkCheckIns')
  // async getBycheckIn(@Body() req: checkInDto) {
  //   try {
  //     const res = await this.checkInService.checkIn(req);
  //     return res;
  //   } catch (error) {
  //     return {
  //       statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //       Message: error,
  //     };
  //   }
  // }

  @Post('/getCheckInById')
  async getCheckInById(@Body() req: checkInDto) {
    try{
      const getId = await this.checkInService.getcheckInById(req);
      return getId
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  @Post('/updateCheckIn')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'profilePic' }, { name: 'capturedPhotos' }, { name: 'images' }]),
  )
  async updateCheckIn(@Body() req: checkInDto, @UploadedFiles() image) {
    try{
      const moderate = await this.checkInService.updatecheckIn(req, image);
      return moderate
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  @Post('/addLocationPoint')
  async addlocationPoint(@Body() req: locationPointDto) {
    try{
      const addlocationtype = await this.checkInService.addLocationPoint(req);
      return addlocationtype
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  @Get('/getLocationPointList')
  async getlocationPointList() {
    try{
      const getlocationtype = await this.checkInService.getLocationPoint();
      return getlocationtype
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  @Post('/updateLocationPoint')
  async updatelocationPoint(@Body() req: locationPointDto) {
    try{
      const addlocationtype = await this.checkInService.updateLocationPoint(req);
      return addlocationtype
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  @Post('/deleteLocationPoint')
  async deletelocationPoint(@Body() req: locationPointDto) {
    try{
      const addlocationtype = await this.checkInService.deleteLocationPoint(req);
      return addlocationtype
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }
}
