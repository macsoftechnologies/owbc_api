import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ timestamps: true })
export class user extends Document {
  @Prop()
  name: string;
  @Prop()
  password: string;
  @Prop()
  email: string;
  @Prop()
  phoneNumber: string;
  @Prop()
  profilePic: string;
}

export const userSchema = SchemaFactory.createForClass(user);
