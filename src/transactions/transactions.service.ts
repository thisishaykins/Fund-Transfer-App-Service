import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, Repository } from 'typeorm';

// import { AccountService } from '../../accounts/account.service';
import { AccountsService } from '../accounts/accounts.service';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private readonly accountsService: AccountsService,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    // Check if source and destination accounts exist
    const sourceAccount = await this.accountsService.findById(
      createTransactionDto.sourceAccountId,
    );
    const destinationAccount = await this.accountsService.findById(
      createTransactionDto.destinationAccountId,
    );

    if (!sourceAccount || !destinationAccount) {
      throw new NotFoundException('Source or destination account not found.');
    }

    // Check if the source account has sufficient funds
    if (sourceAccount.balance < createTransactionDto.amount) {
      throw new ConflictException('Insufficient funds in the source account.');
    }

    // Deduct the amount from the source account
    sourceAccount.balance -= createTransactionDto.amount;
    await this.accountsService.updateBalance(sourceAccount.id, sourceAccount);

    // Add the amount to the destination account
    destinationAccount.balance += createTransactionDto.amount;
    await this.accountsService.updateBalance(
      destinationAccount.id,
      destinationAccount,
    );

    // Create a new transaction record
    const transaction = new Transaction();
    transaction.sourceAccount = sourceAccount;
    transaction.destinationAccount = destinationAccount;
    transaction.amount = createTransactionDto.amount;

    return this.transactionRepository.save(transaction);
  }

  async getTransactionHistory(accountId): Promise<Transaction[]> {
    const transactions = await this.transactionRepository.find({
      where: [{ sourceAccount: accountId }, { destinationAccount: accountId }],
    });

    return transactions;
  }

  findAll() {
    return `This action returns all transactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
