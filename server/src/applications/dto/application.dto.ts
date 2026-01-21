import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ApplicationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @IsOptional()
  category?: string;

  @IsOptional()
  @IsString()
  city?: string;
}
