import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../users/schemas/user.schema';
import { Booking } from 'src/orders/schemas/order.schema';
import { Category } from 'src/categories/schemas/category.schema';
import { Image } from 'src/interfaces';
import { ECurrency } from 'src/common/constants';
import { TCurrency } from 'src/common/types';
// import { Image } from 'src/interfaces';
// import { IsString } from 'class-validator'

export type ProductDocument = Product & mongoose.Document;

@Schema()
export class Review {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    default: null,
  })
  user: User;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  comment: string;

  @Prop({ required: true })
  createdAt: Date;
}

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    type: {
      username: { type: String, required: true },
      phone: { type: Number, required: true },
    },
    _id: false,
  })
  contact: {
    username: string;
    phone: number;
  };

  @Prop({
    required: true,
    type: {
      fullname: { type: String, required: true },
      phone: { type: Number, required: true },
      email: { type: String, required: true },
    },
    _id: false,
  })
  user_details: {
    fullname: string;
    email: string;
    phone: number;
  };

  @Prop({
    required: true,
    type: {
      city: { type: String, required: true },
      district: { type: String, required: true },
      street: { type: String, required: true },
      details: { type: String, required: false },
    },
    _id: false,
  })
  address: {
    city: string;
    district: string;
    street: string;
    details?: string;
  };

  @Prop({
    required: true,
    enum: ['disactivated', 'pending', 'activated'],
  })
  state: string;

  @Prop({
    required: true,
    enum: ['daily_rent', 'monthly_rent', 'sale'],
  })
  operation_type: string;

  @Prop({
    type: {
      special: { type: Array },
      additional: { type: String },
    },
    _id: false,
  })
  comforts: {
    special: Array<string>;
    additional?: string;
  };

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
  description: string;

  @Prop({ required: true })
  reviews: Review[];

  @Prop({ type: Array, required: true,  default: [] })
  bookings: Booking[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' })
  user: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Category',
  })
  category: Category;

  @Prop({ required: true, default: 0 })
  rating: number;

  @Prop({ required: true, default: 0 })
  numReviews: number;

  @Prop({
    required: true,
    type: {
      currency: {
        type: String,
        enum: [ECurrency.USD, ECurrency.RUB, ECurrency.UZS],
        required: true,
      },
      amount: { type: Number, required: true },
    },
    _id: false,
  })
  price: {
    currency: TCurrency;
    amount: number;
  };

  @Prop({ required: true })
  rooms: number;

  
  // @Prop({required: true, default: false})
  // isPremium: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
