import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SharedService } from 'src/shared/shared.service';
import { checkInDto } from './dto/checkIn.dto';
import { locationPointDto } from './dto/locationPoint.dto';
import { checkIn } from './schema/checkIn.schema';
import { locationPoint } from './schema/locationPoint.shema';
var moment = require('moment');
@Injectable()
export class CheckInService {
  constructor(
    @InjectModel(checkIn.name) private checkInModel: Model<checkIn>,
    @InjectModel(locationPoint.name)
    private locationPointModel: Model<locationPoint>,
    private sharedService: SharedService,
  ) {}
  async create(req: checkInDto, image) {
    // req.date = moment(req.createdAt).format('DD-MM-YYYY');
    // req.time = moment(req.createdAt).format('hh:mm:ss');
    // console.log(req.date);
    // console.log(req.time);
    try {
      console.log(req, 'documents...', image);
      if (image) {
        if (image.capturedPhotos && image.capturedPhotos[0]) {
          const attachmentFile = await this.sharedService.saveFile(
            image.capturedPhotos[0],
          );

          req.capturedPhotos = attachmentFile;
        }
        if (image.images && image.images[0]) {
          const attachmentFile = await this.sharedService.saveFile(
            image.images[0],
          );

          req.images = attachmentFile;
        }
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

  async getcheckInById(req: checkInDto) {
    try {
      const getCheckIn = await this.checkInModel.findOne({
        checkIn: req.checkIn,
      });
      if (getCheckIn) {
        return {
          statusCode: HttpStatus.OK,
          message: 'checkIn details',
          getId: getCheckIn,
        };
      } else {
        return { 
          statusCode: HttpStatus.BAD_REQUEST, 
          msg: 'Invalid Request' 
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  async updatecheckIn(req: checkInDto, image) {
    try {

      console.log(req, 'documents...', image);
      if (image) {
        if (image.capturedPhotos && image.capturedPhotos[0]) {
          const attachmentFile = await this.sharedService.saveFile(
            image.capturedPhotos[0],
          );

          req.capturedPhotos = attachmentFile;
        }
        if (image.images && image.images[0]) {
          const attachmentFile = await this.sharedService.saveFile(
            image.images[0],
          );

          req.images = attachmentFile;
        }
      }

      const updateCheckIn = await this.checkInModel.updateOne({checkIn: req.checkIn},{
        $set: {
          userId: req.userId,
          startLocation: req.startLocation,
          endLocation: req.endLocation,
          startVisitDate: req.startVisitDate,
          endVisitDate: req.endVisitDate,
          startVisitTime: req.startVisitTime,
          endVisitTime: req.endVisitTime,
          capturedPhotos: req.capturedPhotos,
          duration: req.duration,
          assignmentId: req.assignmentId,
          locationPointId: req.locationPointId,
          images: req.images
        }
      });
      if (updateCheckIn) {
        return {
          statusCode: HttpStatus.OK,
          message: 'checkIn details',
          getId: updateCheckIn,
        };
      } else {
        return { 
          statusCode: HttpStatus.BAD_REQUEST, 
          msg: 'Invalid Request' 
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  // async checkIn(req: checkInDto) {
  //   try {
  //     const rescheckInId = await this.checkInModel.find({
  //       $and: [{ userId: req.userId }, { date: req.date }],
  //     });
  //     const count = await this.checkInModel.find({
  //       $and: [{ userId: req.userId }, { date: req.date }],
  //     }).count();
  //     if (rescheckInId) {
  //       return {
  //         statusCode: HttpStatus.OK,
  //         feedId: rescheckInId,
  //         count: count,
  //       };
  //     }
  //   } catch (error) {
  //     return {
  //       statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //       Message: error,
  //     };
  //   }
  // }

  async addLocationPoint(req: locationPointDto) {
    try {
      const addloc = await this.locationPointModel.create(req);
      if (addloc) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Added successfully',
          data: addloc,
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          msg: 'Invalid Request',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      };
    }
  }

  async getLocationPoint() {
    try {
      const getloc = await this.locationPointModel.find();
      if (getloc) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'List of locationPoints',
          data: getloc,
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          msg: 'Invalid Request',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      };
    }
  }

  async updateLocationPoint(req: locationPointDto) {
    try {
      const moderate = await this.locationPointModel.updateOne(
        { locationPointId: req.locationPointId },
        {
          $set: { locationPoint: req.locationPoint },
        },
      );
      if (moderate) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'updated Successfully',
          data: moderate,
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          msg: 'Invalid request',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      };
    }
  }

  async deleteLocationPoint(req: locationPointDto) {
    try {
      const eliminate = await this.locationPointModel.deleteOne({
        locationPointId: req.locationPointId,
      });
      if (eliminate) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'deleted Successfully',
          data: eliminate,
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          msg: 'Invalid request',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      };
    }
  }
}
