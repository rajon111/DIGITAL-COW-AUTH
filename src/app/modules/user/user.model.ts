import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser>(
  {
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['buyer', 'seller'],
      required: true,
    },
    name: {
      required: true,
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
    },
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: String,
      required: true,
    },
    income: {
      type: Number,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.pre<IUser>('save', function (next) {
  if (!this.role) {
    this.role = 'buyer';
  }
  if (this.role === 'buyer' && typeof this.income !== 'number') {
    this.income = 0;
  }
  if (this.role === 'seller') {
    // Set required fields for the 'buyer' role
    if (!this.income) {
      return next(new Error("income is required for 'seller' role."));
    }
  }
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
