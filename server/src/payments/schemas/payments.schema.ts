import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { User } from '../../users/schemas/user.schema';

export type PaymentsDocument = Payment & mongoose.Document;

@Schema({ timestamps: true })
export class Payment {
  @Prop({ required: false })
  paid_at: Date;

  @Prop({ required: false })
  canceled_at: Date;
  
  @Prop({ required: false })
  deleted_at: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
