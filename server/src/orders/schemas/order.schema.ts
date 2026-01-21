import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
// import { OrderItem, PaymentResult, ShippingDetails } from 'src/interfaces';
import { Payment } from 'src/payments/schemas/payments.schema';
import { Product } from 'src/products/schemas/product.schema';
import { User } from 'src/users/schemas/user.schema';

export type OrderDocument = Order & mongoose.Document;

@Schema({ timestamps: true })
export class Booking {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: number;

  @Prop({ required: true })
  leaving_date: string;

  @Prop({ required: true })
  entry_date: string;

  @Prop({ required: true })
  guests: number;
}

@Schema({ timestamps: true })
export class Order {
  // @Prop({ required: true })
  // paymentMethod: string;

  // @Prop({
  //   required: false,
  //   type: {
  //     id: { required: true, type: String },
  //     status: { required: true, type: String },
  //     update_time: { required: true, type: String },
  //     email_address: { required: true, type: String },
  //   },
  // })
  // paymentResult: PaymentResult;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' })
  userId: User;

  @Prop({ required: true, type: Object })
  product: any;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'Payment',
    default: null,
  })
  paymentId: Payment;

  @Prop({ type: Object, required: true })
  booking_info: Booking;

  @Prop({
    type: Object,
    required: true,
    currency: { type: String, enum: ['usd', 'rub', "so'm"], required: true },
    amount: { type: Number, required: true },
  })
  profit: {
    currency: string;
    amount: number;
  };

  @Prop({
    required: true,
    enum: ['active', 'created', 'canceled', 'archived', 'pending'],
  })
  state: string;

  @Prop({ required: true, default: false })
  isPaid: boolean;

  @Prop({ required: false, default: null })
  paid_at: Date;

  @Prop({ required: false, default: null })
  archived_at: Date;

  @Prop({ required: false, default: null })
  canceled_at: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);