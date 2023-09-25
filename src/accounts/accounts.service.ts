import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// import { User } from 'src/users/entities/user.entity';
import { Account } from './entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

import { UsersService } from '../users/users.service';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    // @InjectRepository(User)
    // private readonly userRepository: Repository<User>,
    private readonly usersService: UsersService,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    // Check if a user with the given ID exists
    const user = await this.usersService.findOne(createAccountDto.userId);
    if (!user) {
      throw new NotFoundException(
        `User with ID ${createAccountDto.userId} not found.`,
      );
    }

    // Generate a unique 10-digit account number
    const accountNumber = this.generateAccountNumber();

    // Check if an account with the same account number already exists
    const existingAccount = await this.accountRepository.findOne({
      where: {
        accountNumber: accountNumber, //createAccountDto.accountNumber,
      },
    });

    if (existingAccount) {
      throw new ConflictException(
        'Account with this account number already exists.',
      );
    }

    // Create a new account
    const account = new Account();
    account.accountNumber = accountNumber;
    account.accountHolderName = createAccountDto.accountHolderName;
    account.accountType = createAccountDto.accountType;
    account.balance = createAccountDto.initialBalance;
    account.user = user; // Associate the account with the user

    // Save the account to the database
    return this.accountRepository.save(account);
  }

  private generateAccountNumber(): string {
    // Generate a random 10-digit account number (for demonstration purposes)
    const randomAccountNumber = Math.floor(
      1000000000 + Math.random() * 9000000000,
    ).toString();
    return randomAccountNumber;
  }

  async findAll(): Promise<Account[]> {
    return this.accountRepository.find();
  }

  async findById(id: number): Promise<Account | undefined> {
    return this.accountRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async findOne(id: number): Promise<Account | undefined> {
    return this.accountRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(
    id: number,
    updateAccountDto: UpdateAccountDto,
  ): Promise<Account> {
    const account = await this.accountRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found.`);
    }

    // Update account properties based on the DTO
    if (updateAccountDto.accountHolderName) {
      account.accountHolderName = updateAccountDto.accountHolderName;
    }
    if (updateAccountDto.accountType) {
      account.accountType = updateAccountDto.accountType;
    }

    // Save the updated account to the database
    return this.accountRepository.save(account);
  }

  async updateBalance(
    id: number,
    updateAccountDto: UpdateAccountDto,
  ): Promise<Account> {
    const account = await this.accountRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found.`);
    }

    if (updateAccountDto.balance !== undefined) {
      account.balance = updateAccountDto.balance;
    }

    // Save the updated account to the database
    return this.accountRepository.save(account);
  }

  async remove(id: number): Promise<void> {
    const account = await this.accountRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found.`);
    }

    await this.accountRepository.remove(account);
  }

  // findAll() {
  //   return `This action returns all accounts`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} account`;
  // }

  // update(id: number, updateAccountDto: UpdateAccountDto) {
  //   return `This action updates a #${id} account`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} account`;
  // }
}
