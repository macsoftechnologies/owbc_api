import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {v4 as uuid} from 'uuid'

@Schema({ timestamps: true })
export class client extends Document {
  @Prop({required: true, unique: true, default: uuid})
  clientId: string;
  @Prop()
  clientName: string;
  @Prop()
  clientPhNumber: string;
  @Prop()
  Address: [];
}

export const clientSchema = SchemaFactory.createForClass(client);
