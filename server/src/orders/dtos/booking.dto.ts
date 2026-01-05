import {
  IsString,
  IsNumber,
  IsEmail,
  MinLength,
  MaxLength,
} from 'class-validator';

export class BookingDto {
  @MinLength(3, { message: 'Please enter more than 3 characters' })
  @MaxLength(20, { message: 'Please enter less than 20 characters' })
  @IsString()
  name: string;

  @MinLength(3, { message: 'Please enter more than 3 characters' })
  @MaxLength(20, { message: 'Please enter less than 20 characters' })
  @IsString()
  lastName: string;

  @IsString()
  leaving_date: string;

  @IsString()
  entry_date: string;

  @IsEmail()
  email: string;

  @IsNumber()
  phone: number;

  @IsNumber()
  guests: number;
}
