import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { resourceLimits } from 'worker_threads';
import { productDto } from './dto/product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}


  @Post('createProduct')
  async productCreate(@Body() req:productDto){
    try{
      const reqprod=await this.productsService.createProduct(req)
      return reqprod
    }catch(error){
      return{
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        Message:error
      }
    }
  }

  @Get('/getProduct')
  async getProd(){
    try{
      const result=await this.productsService.productget()
      return result
    }catch(error){
      return{
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        Message:error 
      }
    }
  }


@Post('/deleteProduct')
async delprod(@Body() req:productDto){
  try{
    const delres=await this.productsService.deleteProd(req)
    return delres
  }catch(error){
    return{
      statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
      Message:error
    }
  }
}


  @Post('/updateProduct')
  async updateProd(@Body() req:productDto){
    try{
      const prodedit =await this.productsService.editProd(req)
      return prodedit
      }catch(error){
        return{
          statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
          Message:error 
        }
      }
    }
  
 @Post('/getProductById')
 async Prod(@Body() req:productDto){
  try{
    const result =await this.productsService.getProdbyId(req)
    return result
  }catch(error){
    return{
      statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
      Message:error 
    }
  }
 }


}


