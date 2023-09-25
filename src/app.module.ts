import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot(require('./typeorm.config')), // Use the configuration file
    TypeOrmModule.forRoot({
      type: 'postgres', // Change to your database type (e.g., 'mysql')
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME || 'username',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_DATABASE || 'fund_transfer_app',
      entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
      synchronize: true, // Set to false in production
    }),
    UsersModule,
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'IE($*%(#)DNDM', // Replace with your own secret key
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
    AccountsModule,
    TransactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
