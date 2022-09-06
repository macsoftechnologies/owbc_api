import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps:true})
export class client extends Document{
    @Prop()
    clientId:string
    @Prop()
    clientName:string
    @Prop()
    Adress:[]
    @Prop()
    clientPhNumber:string

}

export const clientSchema=SchemaFactory.createForClass(client)
