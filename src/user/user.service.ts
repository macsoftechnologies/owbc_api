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
          data: adminResp,
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
            name: loginRes.name,
            userId: loginRes.userId,
            contact: loginRes.phoneNumber,
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

  async getUsers() {
    try{
      const getList = await this.userModel.find();
      if(getList) {
        return {
          statusCode: HttpStatus.OK,
          msg: "Here is the list of users",
          data: getList,
        }
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        msg: "Invalid Request",
      }
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  async getUserThroughId(req: userDto) {
    try{
      const getOne = await this.userModel.findOne({userId: req.userId});
      if(getOne) {
        return {
          statusCode: HttpStatus.OK,
          msg: "Here is the user",
          data: getOne,
        }
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        msg: "Invalid Request",
      }
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  async userUpdatation(req: userDto) {
    try{
      const remodel = await this.userModel.updateOne(
        {userId: req.userId},
        {$set: {
          name: req.name,
          eamil: req.email,
          password: req.password,
          phoneNumber: req.phoneNumber
        }}
      );
      if(remodel) {
        return {
          statusCode: HttpStatus.OK,
          msg: "Updated Successfully",
          data: remodel,
        }
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        msg: "Invalid Request",
      }
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  async userDeletion(req: userDto) {
    try{
      const eliminate = await this.userModel.deleteOne({userId: req.userId});
      if(eliminate) {
        return {
          statusCode: HttpStatus.OK,
          msg: "Deleted Successfully",
          data: eliminate,
        }
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        msg: "Invalid Request",
      }
    } catch(error) {
      return{
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

}
