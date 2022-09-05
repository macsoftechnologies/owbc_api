import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userDto } from './dto/user.dto';
import { user } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(user.name) private userModel: Model<user>) {}
  async Create(req: userDto) {
    try {
      const adminResp = await this.userModel.create(req);

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

  async Login(req: userDto) {
    try {
      const loginRes = await this.userModel
        .findOne({
          $or: [{ name: req.name }, { phoneNumber: req.phoneNumber }],
        })
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
