import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { assignmentDto } from './dto/assignment.dto';

@Controller('assignment')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}


  @Post('/AddAssignment')
   async addAsses(@Body() body:assignmentDto){
       try{
        const response=await this.assignmentService.createAssignment(body)
        return response
       }catch(error){
        return{
          statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
          message:error
        }
       }
   }


   @Get('/getAssignments')
   async getAssignment(){
    try{
      const response=await this.assignmentService.getAssingment()
      return response
    }catch(error){
      return {
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        message:error 
      }
    }
   }



   @Post('/getassignmentId')
   async  getbyId(@Body() body:assignmentDto){
    try{
      const response=await this.assignmentService.getassesbyId(body)
       return response
    }catch(error){
      return {
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        message:error 
      }
    }
   }
}
