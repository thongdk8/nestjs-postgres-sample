import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateEmployeeDto } from './create-employee.dto';

export class ImportEmployeesDto {
  @ApiProperty({
    type: [CreateEmployeeDto],
  })
  @IsNotEmpty()
  @IsArray()
  employees: CreateEmployeeDto[];
}
