import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { productDto } from './dto/product.dto';
import { product } from './schema/product.schema';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(product.name) private productModel:Model<product>){}

    async createProduct(req:productDto){
        try{
            const resprod=await this.productModel.create(req)
            if(resprod){
                return {
                    statusCode:HttpStatus.OK,
                    Message:'create product sucessfully',
                    prod:resprod
                }
            }
        }catch(error){
            return{
            statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
            Message:error 
            
        }

        }
    }


    async productget(){
        try{
            const res=await this.productModel.find()
            if(res){
                return {
                    statusCode:HttpStatus.OK,
                    Message:'list of product',
                    data:res
                }
            }
        }catch(error){
            return{
                statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
                Message:error
            }
        }
    }


    async deleteProd(req:productDto){
        try{
            const resdel=await this.productModel.deleteOne({ProductId:req.ProductId})
            if(resdel){
                return{
                    statusCode:HttpStatus.OK,
                    Message:'deleted sucessfully',
                    del:resdel
                }
            }
        }catch(error){
            return{
                statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
                Message:error
            }
        }
    }


    async editProd(req:productDto){
        try{
            const updateprod=await this.productModel.updateOne(
                { ProductId:req.ProductId},
                {$set:
                    {
                    productName:req.productName,
                    price:req.price,
                    
                    specifications:req.specifications}})
            if(updateprod){
                return{
                    
                    statusCode:HttpStatus.OK,
                    Message:'updated Sucessfully',
                    produpdateRes:updateprod
                }
            }
        }catch(error){
            return{
                statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
                Message:error 
            }
        }
    }

    
    async getProdbyId(req:productDto){
        try{
            const prodRes=await this.productModel.find({product:req.ProductId})
            if(prodRes){
                return {
                    statusCode:HttpStatus.OK,
                    res:prodRes
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
