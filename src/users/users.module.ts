// src/users/users.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { AccountsModule } from 'src/accounts/accounts.module'; // Import AccountsModule here

@Module({
  imports: [TypeOrmModule.forFeature([User])], // AccountsModule should be imported here
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
