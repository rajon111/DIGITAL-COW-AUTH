import mongoose, { Model } from 'mongoose';

export type ICowLocation =
  | 'Dhaka'
  | 'Chattogram'
  | 'Barishal'
  | 'Rajshahi'
  | 'Sylhet'
  | 'Comilla'
  | 'Rangpur'
  | 'Mymensingh';

export type ICowCategory = 'Dairy' | 'Beef' | 'DualPurpose';

export type ICow = {
  name: string;
  age: string;
  price: number;
  location: ICowLocation;
  breed: string;
  weight: string;
  label: string;
  category: string;
  seller?: mongoose.Types.ObjectId;
};

export type CowModel = Model<ICow, Record<string, unknown>>;
