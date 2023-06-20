import { Request, Response } from 'express';
import { OrderService } from './order.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

// const createOrder = async (req: Request, res: Response) => {
//   try {
//     const { cow, buyer } = req.body;
//     const order = await OrderService.createOrder(cow, buyer);

//     res.status(201).json({
//       success: true,
//       message: 'Order placed successfully',
//       data: order,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { cow, buyer } = req.body;
  const result = await OrderService.createOrder(cow, buyer);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' User Create Successfully',
    data: result,
  });
});
export const OrderController = {
  createOrder,
};
