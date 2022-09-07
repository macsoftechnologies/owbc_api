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
  async getcheckout() {
    try {
      const checkOuts = await this.checkInModel.find();
      if (checkOuts) {
        return {
          statusCode: HttpStatus.OK,
          data: checkOuts,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  async deletecheckout(req: checkInDto) {
    try {
      const delcheckout = await this.checkInModel.deleteOne({
        checkIn: req.checkIn,
      });
      if (delcheckout) {
        return {
          statusCode: HttpStatus.OK,
          message: 'deleted  Sucessfully',
          del: delcheckout,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }
  async getcheckIn() {
    try {
      const checkIn = await this.checkInModel.find();
      if (checkIn) {
        return {
          statusCode: HttpStatus.OK,
          data: checkIn,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  async deletecheckIn(req: checkInDto) {
    try {
      const delcheckIn = await this.checkInModel.deleteOne({
        checkIn: req.checkIn,
      });
      if (delcheckIn) {
        return {
          statusCode: HttpStatus.OK,
          message: 'deleted  Sucessfully',
          del: delcheckIn,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }
  async checkIn(req: checkInDto) {
    try {
      const rescheckInId = await this.checkInModel.find({
        $and: [{ userId: req.userId }, { date: req.date }],
      });
      const count = await this.checkInModel.find({
        $and: [{ userId: req.userId }, { date: req.date }],
      }).count();
      if (rescheckInId) {
        return {
          statusCode: HttpStatus.OK,
          feedId: rescheckInId,
          count: count,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }
}
