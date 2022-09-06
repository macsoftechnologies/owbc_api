import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Document} from 'mongoose'
import {v4 as uuid} from 'uuid'
 
@Schema()
export class specifications{}

@Schema({timestamps:true})
export class  product extends Document{
    @Prop({required: true, unique: true, default: uuid})
    ProductId:string
    @Prop()
    productName:string
    @Prop()
    price:string
    @Prop({trim: true,strict:true,type:specifications})
    specifications:{
        type:any 
    }
}

export const  productSchema=SchemaFactory.createForClass(product)