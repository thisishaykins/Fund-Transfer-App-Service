import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountDto } from './create-account.dto';

import { IsString, IsEnum, IsOptional, IsNumber, Min } from 'class-validator';
import { AccountType } from '../entities/account.entity'; // Import the AccountType enum

// export class UpdateAccountDto extends PartialType(CreateAccountDto) {}
export class UpdateAccountDto {
  @IsOptional()
  @IsString()
  accountHolderName?: string;

  @IsOptional()
  @IsEnum(AccountType)
  accountType?: AccountType;

  @IsOptional()
  @IsNumber()
  @Min(0)
  balance?: number; // Do not update balance directly through this DTO
}
