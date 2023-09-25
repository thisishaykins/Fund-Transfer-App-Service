import { ApiProperty } from '@nestjs/swagger';

export class AccountDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  accountNumber: string;

  @ApiProperty()
  accountHolderName: string;

  @ApiProperty()
  accountType: string;

  @ApiProperty()
  balance: number;
}
