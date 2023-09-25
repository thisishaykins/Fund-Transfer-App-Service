import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum, IsNumber, IsPositive } from 'class-validator';
import { AccountType } from '../entities/account.entity';

export class CreateAccountDto {
  @ApiProperty()
  @IsNotEmpty()
  accountHolderName: string;

  @ApiProperty({
    enum: AccountType,
  })
  @IsEnum(AccountType)
  accountType: AccountType;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  initialBalance: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  userId: number; // Add a field for user ID
}
