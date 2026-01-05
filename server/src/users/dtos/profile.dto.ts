import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { ProductDocument } from 'src/products/schemas/product.schema';

export enum Gender {
  Male = 'male',
  Female = 'female',
}

export class ProfileDto {
  @IsString()
  @MinLength(4, { message: 'Username is too short.' })
  @MaxLength(20, { message: 'Username is too long.' })
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsOptional()
  phone?: number | null;

  @IsEnum(Gender, { message: 'Gender must be a valid enum value.' })
  @IsOptional()
  gender?: string | null;

  @IsEmail({}, { message: 'Email address is not valid.' })
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(5, { message: 'Password is too short.' })
  @MaxLength(20, { message: 'Password is too long.' })
  @IsOptional()
  password?: string;

  @IsOptional()
  favorite?: string;
}
