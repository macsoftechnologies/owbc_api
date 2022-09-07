import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { clientDto } from './dto/client.dto';
import { client } from './schema/client.schema';

@Injectable()
export class ClientService {
    constructor(@InjectModel(client.name) private clientModel:Model<client>){}
    

    async createClient(req:clientDto){
       try{
        const clientReq=await this.clientModel.create(req)
        if(clientReq){
            return{
                statusCode:HttpStatus.OK,
                req:clientReq
                
            }
        }
       }catch(error){
        return{
            statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
            Message:error
        }
       }
    }


    async getclient(){
        try{
            const getres=await this.clientModel.find()
            if(getres){
                return{
                    statusCode:HttpStatus.OK,
                    Message:'list of  clients',
                    data:getres 
                }
            }
        }catch(error){
            return{
                statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
                Message:error
            }
        }
      }

  
    async delclient(req:clientDto){
        try{
            const res=await this.clientModel.deleteOne({clientId:req.clientId})
            if(res){
                return{
                    statusCode:HttpStatus.OK,
                    Message:'deleted Sucessfully',
                    del:res
                }
            }
        }catch(error){
            return{
                statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
                Message:error 
            }
        }
    }

    async updateclient(req:clientDto){
        try{
            const editclient=await this.clientModel.updateOne({clientId:req.clientId},{$set:{clientName:req.clientName,Address:req.Address,clientPhNumber:req.clientPhNumber}})
            if(editclient){
                return{
                    statusCode:HttpStatus.OK,
                    Message:'updated sucessfully',
                    edit:editclient
                }
            }
        }catch(error){
            return{
                statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
                Message:error
            }
        }
     }

     async getByclient(req:clientDto){
        try{
            const resId=await this.clientModel.find({clientId:req.clientId})
            if(resId){
                return {
                    statusCode:HttpStatus.OK,
                    res:resId
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
