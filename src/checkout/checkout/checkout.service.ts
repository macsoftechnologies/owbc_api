import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { checkoutDto } from './dto/checkout.dto';
import { checkout } from './schema/checkout.schema';
var moment = require('moment');
@Injectable()
export class CheckoutService {
  constructor(
    @InjectModel(checkout.name) private checkoutModel: Model<checkout>,
  ) {}

  async createCheckout(req: checkoutDto) {
    req.date = moment(req.createdAt).format('DD-MM-YYYY');
    req.time = moment(req.createdAt).format('hh:mm:ss');
    console.log(req.date);
    console.log(req.time);
    try {
      const checkoutReq = await this.checkoutModel.create(req);
      if (checkoutReq) {
        return {
          statusCode: HttpStatus.OK,
          res: checkoutReq,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  async getcheckout() {
    try {
      const checkOuts = await this.checkoutModel.find();
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

  async deletecheckout(req: checkoutDto) {
    try {
      const delcheckout = await this.checkoutModel.deleteOne({
        checkoutId: req.checkoutId,
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

  async editcheckout(req: checkoutDto) {
    try {
      const resEdit = await this.checkoutModel.updateOne(
        { checkoutId: req.checkoutId },
        { $set: { checkout: req.checkout } },
      );
      if (resEdit) {
        return {
          statusCode: HttpStatus.OK,
          Message: 'updated Sucessfully',
          updateres: resEdit,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  async checkoutbyId(req: checkoutDto) {
    try {
      const rescheckoutId = await this.checkoutModel.find({
        checkoutId: req.checkoutId,
      });
      if (rescheckoutId) {
        return {
          statusCode: HttpStatus.OK,
          feedId: rescheckoutId,
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
