import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps:true})
export class assignment extends Document{
    @Prop()
    assignmentId:string
    @Prop()
    assignment:string
}
export const assignmentSchema=SchemaFactory.createForClass(assignment)