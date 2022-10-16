import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTransferRequestDto {
  @ApiPropertyOptional({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  employeeId: string;

  @ApiPropertyOptional({
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  request_amount: number;
}
