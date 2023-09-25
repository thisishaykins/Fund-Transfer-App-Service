import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateAccountDto } from './create-account.dto';

import { IsString, IsEnum, IsOptional, IsNumber, Min } from 'class-validator';
import { AccountType } from '../entities/account.entity'; // Import the AccountType enum

// export class UpdateAccountDto extends PartialType(CreateAccountDto) {}
export class UpdateAccountDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  accountHolderName?: string;

  @ApiProperty({
    enum: AccountType,
    required: false,
  })
  @IsOptional()
  @IsEnum(AccountType)
  accountType?: AccountType;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  balance?: number; // Do not update balance directly through this DTO
}
