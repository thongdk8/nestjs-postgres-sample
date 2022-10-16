import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiPropertyOptional({
    type: String,
  })
  @IsNotEmpty()
  companyId: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiPropertyOptional({
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  salary: number;
}