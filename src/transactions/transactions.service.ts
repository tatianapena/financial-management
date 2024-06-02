import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
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

  async findAll(): Promise<Transaction[]> {
    return await this.transactionModel.find().exec();
  }

  async findOne(id: string): Promise<Transaction> {
    const transaction = await this.transactionModel.findById(id).exec();
    if (!transaction) {
      throw new NotFoundException(`Transaction #${id} not found`);
    }
    return transaction;
  }

  async update(
    id: string,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<Transaction> {
    const updatedTransaction = await this.transactionModel
      .findByIdAndUpdate(id, updateTransactionDto, { new: true })
      .exec();
    if (!updatedTransaction) {
      throw new NotFoundException(`Transaction #${id} not found`);
    }
    return updatedTransaction;
  }

  async delete(id: string): Promise<string> {
    const deletedTransaction = await this.transactionModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedTransaction) {
      throw new NotFoundException(`Transaction #${id} not found`);
    }
    return `Transaction #${id} successfully deleted`;
  }
}
