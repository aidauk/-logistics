import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Image } from 'src/interfaces';

export type NewsDocument = News & mongoose.Document;

@Schema({ timestamps: true })
export class News {  
  @Prop({ required: true })
  description: string;

  @Prop({
    type: [
      {
        path: { type: String, required: true },
        filename: { type: String, required: true },
        size: { type: Number, required: true },
        uri: { type: String, required: true },
      },
    ],
    default: [],
    _id: false,
  })
  images: Image[];

  @Prop({ required: true })
  title: string;
}

export const NewsSchema = SchemaFactory.createForClass(News);
