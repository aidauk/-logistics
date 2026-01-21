import { Expose, Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CategoryDto {
  @IsString()
  @Expose()
  name: string;

  @Expose()
  @Transform(({ key, obj }) => obj[key])
  _id: ObjectId;
}
