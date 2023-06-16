import { Model, Types } from 'mongoose';

export type IUser = {
  id: string;
  role: string;
  password: string;
  buyer?: Types.ObjectId;
  seller?: Types.ObjectId;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
