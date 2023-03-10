import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { v4 as uuid } from 'uuid';
@Schema({ timestamps: true })

export class locationPoint extends Document{
    @Prop({default: uuid})
    locationPointId: string;
    @Prop()
    locationPoint: string;
}

export const locationPointSchema = SchemaFactory.createForClass(locationPoint);