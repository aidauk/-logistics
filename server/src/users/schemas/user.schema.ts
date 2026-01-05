import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';

export type UserDocument = User & mongoose.Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop()
  address: string;

  @Prop({ enum: ['male', 'female', null] })
  gender: string | null;

  @Prop({ unique: true })
  phone: number | null;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  products: mongoose.Types.ObjectId[];

  @Prop({ required: true, default: false })
  isAdmin: boolean;

  @Prop({ required: true, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: [] }] })
  favorites: mongoose.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
