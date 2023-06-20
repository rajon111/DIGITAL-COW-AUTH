import { Schema, Types, model } from 'mongoose';
import { ICow } from './cow.interface';
import { cowCategory, cowLocation } from './cow.constant';

const cowSchema = new Schema<ICow>({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
    enum: cowLocation,
  },
  breed: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    enum: ['for sale', 'sold out'],
    required: true,
    default: 'for sale',
  },
  category: {
    type: String,
    required: true,
    enum: cowCategory,
  },
  seller: {
    type: Types.ObjectId,
    ref: 'User', // Referencing the 'User' model
    required: true,
  },
});

export const Cow = model<ICow>('Cow', cowSchema);
