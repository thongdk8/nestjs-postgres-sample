import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../users/enums/role.enum';

export class CreateCompanyAdminDto {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  companyId: string;

  @ApiProperty({
    type: String,
  })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    type: String,
  })
  @IsOptional()
  @IsString()
  name?: string;
}
