import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { pollingDto } from './dto/polling.dto';
import { PollingService } from './polling.service';

@Controller('polling')
export class PollingController {
  constructor(private readonly pollingService: PollingService) {}

  @Post('/addLocation')
  async CreatePoll(@Body() req: pollingDto) {
    try {
      const resp = await this.pollingService.createPoll(req);
      return resp;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  @Get('/getPolls')
  async PollsGet() {
    try {
      const result = await this.pollingService.getPoll();
      return result;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  @Post('/deletepoll')
  async polldel(@Body() req: pollingDto) {
    try {
      const resdel = await this.pollingService.deletePoll(req);
      return resdel;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  @Post('/editpoll')
  async pollupdate(@Body() req: pollingDto) {
    try {
      const resedit = await this.pollingService.editPoll(req);
      return resedit;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  @Post('/getpollId')
  async getById(@Body() req: pollingDto) {
    try {
      const res = await this.pollingService.pollingbyId(req);
      return res;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }
}
