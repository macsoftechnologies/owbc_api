import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import { Document } from 'mongoose';
@Schema({ timestamps: true })
export class user extends Document {
  @Prop({ unique: true })
  name: string;
  @Prop()
  password: string;
  @Prop({ unique: true })
  email: string;
  @Prop()
  phoneNumber: string;
  @Prop({ required: true, unique: true, default: uuid })
  userId: string;
}

export const userSchema = SchemaFactory.createForClass(user);
