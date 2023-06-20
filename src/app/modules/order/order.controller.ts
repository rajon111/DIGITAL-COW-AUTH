import { Request, Response } from 'express';
import { OrderService } from './order.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { cow, buyer } = req.body;
  const result = await OrderService.createOrder(cow, buyer);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Order Create Successfully',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrders();

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No Order found');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Orders retrieved successfully',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
};
