import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { adminDto } from './dto/admin.dto';
import { admin } from './schema/admin.schema';

@Injectable()
export class AdminService {
  constructor(@InjectModel(admin.name) private adminModel: Model<admin>) {}
  async Create(req: adminDto) {
    try {
      const adminResp = await this.adminModel.create(req);

      if (adminResp) {
        return {
          statusCode: HttpStatus.OK,
          addLang: {
            selectedLang: adminResp,
          },
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

  async Login(req: adminDto) {
    try {
      const loginRes = await this.adminModel
        .findOne({ $or: [{ name: req.name }, { phoneNuber: req.phoneNumber }] })
        .lean();
      if (loginRes) {
        if (loginRes.password === req.password) {
          return {
            statusCode: HttpStatus.OK,
            message: 'Login SuccessFully',
            logindetails: loginRes,
          };
        }

        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid Password',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }
}
