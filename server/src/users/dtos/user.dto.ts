import { Expose, Transform } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { ObjectId, Types } from 'mongoose';
import { Product, ProductDocument } from 'src/products/schemas/product.schema';

export class UserDto {
  @Expose()
  email: string;

  @Expose()
  @Transform(({ key, obj }) => obj[key])
  _id: ObjectId;

  @Expose()
  name: string;

  @Expose()
  phone: number | null;

  @Expose()
  address: string;

  @Expose()
  gender: string | null;

  @Expose()
  isAdmin: boolean;

  @Expose() 
  @Transform(({ key, obj }) => obj[key])
  favorites: ObjectId[];

  
  @Expose() 
  @Transform(({ key, obj }) => obj[key])
  products: ObjectId[];

  @Expose()
  accessToken?: string;
}
