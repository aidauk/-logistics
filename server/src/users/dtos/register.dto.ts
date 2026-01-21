import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsNumber,
} from "class-validator";

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20, { message: "Username is too long." })
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: "Email adress is not valid." })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5, { message: "Password is not strong." })
  password: string;

  verification? : number;
}
