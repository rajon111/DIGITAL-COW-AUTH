import { Types } from 'mongoose';
import { Order } from './order.model';

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { Cow } from '../cow/cow.model';
import { User } from '../user/user.model';

const createOrder = async (cowId: string, buyerId: string) => {
  // Check if the cow and buyer IDs are valid ObjectIds
  const isValidCowId = Types.ObjectId.isValid(cowId);
  const isValidBuyerId = Types.ObjectId.isValid(buyerId);

  if (!isValidCowId || !isValidBuyerId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid cow or buyer ID');
  }

  // Find the cow by ID
  const selectedCow = await Cow.findById(cowId);

  if (!selectedCow) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow not found');
  }

  // Find the buyer by ID
  const selectedBuyer = await User.findById(buyerId);

  if (!selectedBuyer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Buyer not found');
  }

  // Check if the buyer has enough money to buy the cow
  if (selectedBuyer.budget < selectedCow.price) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Insufficient funds');
  }

  // Start a session for the transaction
  const session = await Order.startSession();
  session.startTransaction();

  try {
    // Update the cow's label to 'sold out'
    selectedCow.label = 'sold out';
    await selectedCow.save({ session });

    // Deduct the cost of the cow from the buyer's budget
    selectedBuyer.budget -= selectedCow.price;
    await selectedBuyer.save({ session });

    // Create the order
    const order = new Order({
      cow: selectedCow._id,
      buyer: selectedBuyer._id,
    });
    await order.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return order;
  } catch (error) {
    // Abort the transaction if an error occurs
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const OrderService = {
  createOrder,
};
