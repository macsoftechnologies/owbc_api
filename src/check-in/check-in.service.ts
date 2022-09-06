import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { checkInDto } from './dto/checkIn.dto';
import { checkIn } from './schema/checkIn.schema';
var moment = require('moment');
@Injectable()
export class CheckInService {
  constructor(
    @InjectModel(checkIn.name) private checkInModel: Model<checkIn>,
  ) {}
  async create(req: checkInDto, image) {
    req.date = moment(req.createdAt).format('DD-MM-YYYY');
    req.time = moment(req.createdAt).format('hh:mm:ss');
    console.log(req.date);
    console.log(req.time);
    try {
      console.log(req, 'documents...', image);
      if (image) {
        const reqDoc = image.map((doc, index) => {
          let IsPrimary = false;
          if (index == 0) {
            IsPrimary = true;
          }
          const randomNumber = Math.floor(Math.random() * 1000000 + 1);
          return doc.filename;
        });

        req.profilePic = reqDoc.toString();
      }
      console.log(req);
      // return false;
      const userEntityResp = await this.checkInModel.create(req);

      if (userEntityResp) {
        return {
          statusCode: HttpStatus.OK,
          data: userEntityResp,
        };
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Invalid Request',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }
}
