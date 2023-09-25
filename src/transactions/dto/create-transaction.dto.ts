import { ApiProperty } from '@nestjs/swagger';
import { IsPositive, IsNumber, Min, IsNotEmpty } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  sourceAccountId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  destinationAccountId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  amount: number;
}
