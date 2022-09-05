import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { pollingDto } from './dto/polling.dto';
import { polling } from './schema/polling.schema';

@Injectable()
export class PollingService {
    constructor(@InjectModel(polling.name) private PollingModel:Model<polling>){}

 
    async createPoll(req:pollingDto){
        try{
            const pollReq=await this.PollingModel.create(req)
            if(pollReq){
                return{
                    statusCode:HttpStatus.OK,
                    res:pollReq
                }
            }
        }catch(error){
            return{
                statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
                Message:error
            }
        }
    }

    async getPoll(){
        try{
            const polls=await this.PollingModel.find()
            if(polls){
                return{
                    statusCode:HttpStatus.OK,
                    data:polls
                }
            }
        }catch(error){
            return{
                statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
                Message:error
            }
        }
    }


     async deletePoll(req:pollingDto){
        try{
         const delPoll=await this.PollingModel.deleteOne({pollId:req.pollId})
         if(delPoll){
            return{
                statusCode:HttpStatus.OK,
                message:'deleted  Sucessfully',
                del:delPoll
            }
         }
        }catch(error){
            return{
                statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
                Message:error
            }
        }
     }


     async editPoll(req:pollingDto){
        try{
            const resEdit=await this.PollingModel.updateOne({pollId:req.pollId},{$set:{longitude:req.longitude,latitude:req.latitude}})
            if(resEdit){
                return{
                    statusCode:HttpStatus.OK,
                    Message:'updated Sucessfully',
                    updateres:resEdit
                }
            }
        }catch(error){
            return{
                statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
                Message:error

            }
        }
     }


     async  pollingbyId(req:pollingDto){
        try{
            const respollId=await this.PollingModel.find({pollId:req.pollId})
            if(respollId){
                return{
                    statusCode:HttpStatus.OK,
                    feedId:respollId
                }
            }
        }catch(error){
            return{
                statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
                Message:error
            }
        }
    }



}
