import { IsNotEmpty, IsEnum, IsNumber, IsPositive } from 'class-validator';
import { AccountType } from '../entities/account.entity';

export class CreateAccountDto {
  @IsNotEmpty()
  accountHolderName: string;

  @IsEnum(AccountType)
  accountType: AccountType;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  initialBalance: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  userId: number; // Add a field for user ID
}
