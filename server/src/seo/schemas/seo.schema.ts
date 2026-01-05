import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type SeoDocument = Seo & mongoose.Document;

@Schema({ timestamps: true })
export class Seo {  
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  keywords: string[];
}

export const SeoSchema = SchemaFactory.createForClass(Seo);
