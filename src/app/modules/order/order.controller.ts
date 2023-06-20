import { Request, Response } from 'express';
import { OrderService } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { cow, buyer } = req.body;
    const order = await OrderService.createOrder(cow, buyer);

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: order,
    });
  } catch (error) {
    console.log(error);
  }
};
export const OrderController = {
  createOrder,
};
