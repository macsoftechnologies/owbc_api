import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ClientService } from './client.service';
import { clientDto } from './dto/client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}


  @Post('/createClient')
  async CreateClient(@Body() req:clientDto){
    try{
      const res=await this.clientService.createClient(req)
      return res
    }catch(error){
      return{
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        Message:error
      }
    }
  }


  @Get('/getClients')
  async cleints(){
    try{
      const result=await this.clientService.getclient()
      return result
    }catch(error){
      return {
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        Message:error
      }
    }
  }


  @Post('/deleteclient')
  async clientdel(@Body() req:clientDto){
    try{
      const result=await this.clientService.delclient(req)
      return result
    }catch(error){
      return{
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        Message:error 
      }
    }
  }


  @Post('/editClient')
  async clientEdit(@Body() req:clientDto){
    try{
      const res=await this.clientService.updateclient(req)
      return res
    }catch(error){
      return{
         statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
         Message:error
      }
    }
  }

  @Post('/getclientById')
  async clientByid(@Body() req:clientDto){
    try{
      const result=await this.clientService.getByclient(req)
      return result
    }catch(error){
      return{
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        Message:error 
      }
    }
  }
}
