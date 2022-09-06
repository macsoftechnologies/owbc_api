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
}
