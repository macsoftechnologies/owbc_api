import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { assignmentDto } from './dto/assignment.dto';
import { assignment } from './schema/assignment.schema';

@Injectable()
export class AssignmentService {
    constructor(@InjectModel(assignment.name) private assignmentModel:Model<assignment>){}
    
    async createAssignment(params:assignmentDto){
        try{
            const assignment=await this.assignmentModel.create(params)
            if(assignment){
                return {
                    statusCode:HttpStatus.OK,
                    addAsses:assignment
                }
            }
        }catch(error){
            return {
                statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
                message:error 
            }
        }
    }
    

  async getAssingment(){
    try{
        const request=await this.assignmentModel.find()
        if(request){
            return {
            statusCode:HttpStatus.OK,
            message:'list of assignment',
            data:request
            }
        }
    }catch(error){
        return {
            statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
            message:error 
        }
    }
  }


  async getassesbyId(params:assignmentDto){
    try{
        const requestasses=await this.assignmentModel.findOne({assignmentId:params.assignmentId})
        if(requestasses){
            return {
                statusCode:HttpStatus.OK,
                data:requestasses
            }
        }
    }catch(error){
        return {
            statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
            message:error 
        }
    }
  }
}
