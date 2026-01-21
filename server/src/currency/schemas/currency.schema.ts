import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ECurrency } from 'src/common/constants';
// import { Image } from 'src/interfaces';
// import { IsString } from 'class-validator'

export type CurrencyDocument = Currency & mongoose.Document;

@Schema()
export class Currency {
  @Prop({ type: String, enum: [ECurrency.USD, ECurrency.RUB, ECurrency.UZS], required: true })
  name: string;

  @Prop({ required: true })
  isoCode: number;

  @Prop({ required: true })
  baseRate: number;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const CurrencySchema = SchemaFactory.createForClass(Currency);
