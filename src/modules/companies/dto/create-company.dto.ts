import { IsNotEmpty, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiPropertyOptional({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
