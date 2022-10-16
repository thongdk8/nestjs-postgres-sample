import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCompanyDto {
  @ApiProperty({
    type: String,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    type: String,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
