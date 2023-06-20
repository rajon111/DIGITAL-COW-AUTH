import { Schema, Types, model } from 'mongoose';
import { IOrder } from './order.interface.';

const orderSchema = new Schema<IOrder>({
  cow: {
    type: Types.ObjectId,
    ref: 'Cow',
    required: true,
  },
  buyer: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const Order = model<IOrder>('Order', orderSchema);
