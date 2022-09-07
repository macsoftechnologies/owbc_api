import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { checkoutDto } from './dto/checkout.dto';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('/addCheckout')
  async Createcheckout(@Body() req: checkoutDto) {
    try {
      const resp = await this.checkoutService.createCheckout(req);
      return resp;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  @Get('/getcheckout')
  async checkoutGet() {
    try {
      const result = await this.checkoutService.getcheckout();
      return result;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  @Post('/deletecheckout')
  async checkoutdel(@Body() req: checkoutDto) {
    try {
      const resdel = await this.checkoutService.deletecheckout(req);
      return resdel;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  @Post('/editcheckout')
  async checkoutupdate(@Body() req: checkoutDto) {
    try {
      const resedit = await this.checkoutService.editcheckout(req);
      return resedit;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  @Post('/getcheckoutuserId')
  async getByUserId(@Body() req: checkoutDto) {
    try {
      const res = await this.checkoutService.checkoutbyuserId(req);
      return res;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }
}
