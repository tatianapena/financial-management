import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateTransactionDto } from './dto/create-transaction.dto';
/* import { UpdateTransactionDto } from './dto/update-transaction.dto'; */
import { Transaction } from './schema/transactions.schema';
import { User } from 'src/user/schema/user.schema';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const { user } = createTransactionDto;
    const newTransaction = await new this.transactionModel(
      createTransactionDto,
    ).save();
    const transactionUser = await this.userModel.findById(user);
    if (!transactionUser) {
      throw new NotFoundException();
    }
    if (!transactionUser.transactions) {
      transactionUser.transactions = [];
    }
    transactionUser.transactions.push(newTransaction._id);
    if (newTransaction.type === 'income') {
      transactionUser.capital += newTransaction.amount;
    } else if (newTransaction.type === 'expense') {
      transactionUser.capital -= newTransaction.amount;
    }
    await transactionUser.save();
  }

  /*   findAll() {
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
  } */
}
