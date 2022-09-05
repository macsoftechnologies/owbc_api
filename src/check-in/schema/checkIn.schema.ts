import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';
import { v4 as uuid } from 'uuid';
@Schema({ timestamps: true })
export class checkIn extends Document {
  @Prop()
  userId: string;
  @Prop()
  profilePic: string;
  @Prop({ required: true, unique: true, default: uuid })
  checkIn: string;
}

export const checkInSchema = SchemaFactory.createForClass(checkIn);
