import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ApplicationDocument = Application & mongoose.Document;

@Schema({ timestamps: true })
export class Application {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'Category',
  })
  category: string;

  @Prop({ required: true, enum: ['answered', 'new'] })
  state: string;

  @Prop({ required: false })
  city: string;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
