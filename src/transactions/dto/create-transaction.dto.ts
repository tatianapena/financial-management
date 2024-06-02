import { TransactionType } from '../schema/transactions.schema';

export class CreateTransactionDto {
  amount: number;
  type: TransactionType;
  user: string;
  description: string;
  date: Date;
}
