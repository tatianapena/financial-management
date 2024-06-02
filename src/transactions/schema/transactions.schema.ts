import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from 'src/user/schema/user.schema';

export type TransactionDocument = HydratedDocument<Transaction>;

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

@Schema()
export class Transaction {
  @Prop({ type: mongoose.Schema.Types, auto: true })
  _id: string;
  @Prop({ required: true })
  amount: number;
  @Prop({ required: true })
  date: Date;
  @Prop({ required: true })
  type: TransactionType;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  User: User[];
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
