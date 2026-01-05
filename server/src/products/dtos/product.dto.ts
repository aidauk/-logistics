import {
  IsString,
  IsNumber,
  IsObject,
  IsArray,
  IsNotEmpty,
  IsEnum,
  ValidateNested,
  IsMongoId,
  IsEmail,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Category } from 'src/categories/schemas/category.schema';
import { TCurrency } from 'src/common/types';
import { ECurrency } from 'src/common/constants';

class PriceDTO {
  @IsString()
  @IsEnum(ECurrency)
  currency: TCurrency;

  @IsNumber()
  amount: number;
}

class ComfortsDTO {
  @IsArray()
  special: Array<string>;

  @IsString()
  additional: string;
}

class AddressDTO {
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  district: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  details?: string;
}

class userDetailsDTO {
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  phone: number;
}

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsObject()
  @IsNotEmpty()
  contact: {
    username: string;
    phone: number;
  };

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => AddressDTO)
  address: AddressDTO;

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => userDetailsDTO)
  user_details: userDetailsDTO;

  @IsNotEmpty()
  @IsMongoId()
  category: Category;

  @IsEnum(['daily_rent', 'monthly_rent', 'sale'])
  @IsNotEmpty()
  @IsString()
  operation_type: string;

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => ComfortsDTO)
  comforts?: ComfortsDTO;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => PriceDTO)
  price: PriceDTO;

  @IsNumber()
  @IsNotEmpty()
  rooms: number;

  // @IsBoolean()
  // isPremium: boolean;
}
