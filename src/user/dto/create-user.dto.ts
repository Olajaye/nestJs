import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto{
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;  

  @ApiProperty()
  @IsEnum(["INTEN" , "ADMIN" , "DOCTOR"], {
    message: "Valid role required"
  })
  role: "INTEN" | "ADMIN" | "DOCTOR"
}