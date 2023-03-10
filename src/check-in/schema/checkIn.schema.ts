import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';
import { v4 as uuid } from 'uuid';
@Schema({ timestamps: true })
export class checkIn extends Document {
  @Prop()
  userId: string;
  @Prop({ required: true, unique: true, default: uuid })
  checkIn: string;
  @Prop()
  startLocation: string;
  @Prop()
  endLocation: string;
  @Prop()
  startVisitDate: string;
  @Prop()
  endVisitDate: string;
  @Prop()
  startVisitTime: string;
  @Prop()
  endVisitTime: string;
  @Prop()
  capturedPhotos: [];
  @Prop()
  assignmentId: string;
  @Prop()
  duration: string;
  @Prop()
  locationPointId: string;
  @Prop()
  images: [];
}

export const checkInSchema = SchemaFactory.createForClass(checkIn);
