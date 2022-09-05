import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"
import {v4 as uuid} from 'uuid'

@Schema({timestamps:true})
export class polling extends Document{
    @Prop({required: true, default:uuid, unique:true})
    pollId:string
    @Prop()
    longitude:string
    @Prop()
    latitude:string
    @Prop()
    userId:string
    
}
export const pollingSchema=SchemaFactory.createForClass(polling)