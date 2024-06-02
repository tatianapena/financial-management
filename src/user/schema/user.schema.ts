import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Transaction } from 'src/transactions/schema/transactions.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users', timestamps: true })
export class User {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  email: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' })
  transaction: Transaction[];
}

export const UserSchema = SchemaFactory.createForClass(User);
