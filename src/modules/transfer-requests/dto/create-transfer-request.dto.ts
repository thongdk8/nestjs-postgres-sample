import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTransferRequestDto {
  @ApiPropertyOptional({
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  request_amount: number;
}
