import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IncomeModule } from './income/income.module';
import { ExpensiveModule } from './expensive/expensive.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsModule } from './transactions/transactions.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { config } from 'dotenv';

config();
@Module({
  imports: [
    IncomeModule,
    ExpensiveModule,
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@financialmangement.mcxbrnb.mongodb.net/`,
    ),
    TransactionsModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
