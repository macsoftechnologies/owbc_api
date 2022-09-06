import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
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

  
}
