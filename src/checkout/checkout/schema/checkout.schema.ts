import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';

@Schema({ timestamps: true })
export class checkout extends Document {
  @Prop({ required: true, default: uuid, unique: true })
  checkoutId: string;
  @Prop()
  checkout: string;
  @Prop()
  userID: string;
  @Prop()
  date: string;
  @Prop()
  time: string;
}

export const checkoutSchema = SchemaFactory.createForClass(checkout);
