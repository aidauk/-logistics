import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsEnum,
} from 'class-validator';

export enum Gender {
  Male = 'male',
  Female = 'female',
}

export class AdminProfileDto {
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
}
