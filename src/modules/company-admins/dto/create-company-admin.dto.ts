import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../../users/enums/role.enum';

export class CreateCompanyAdminDto {
  @ApiPropertyOptional({
    type: String,
  })
  @IsNotEmpty()
  companyId: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
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
  @IsOptional()
  @IsString()
  name?: string;
}
