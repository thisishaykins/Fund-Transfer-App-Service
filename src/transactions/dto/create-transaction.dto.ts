import { IsPositive, IsNumber, Min } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  @IsPositive()
  sourceAccountId: number;

  @IsNumber()
  @IsPositive()
  destinationAccountId: number;

  @IsNumber()
  @Min(0)
  amount: number;
}
