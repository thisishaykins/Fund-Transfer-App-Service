// src/accounts/accounts.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { Account } from './entities/account.entity';
import { UsersModule } from 'src/users/users.module'; // Import UsersModule here
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Account]), UsersModule],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
