import express from 'express';
import { OrderController } from './order.controller';
const router = express.Router();

router.post('/post', OrderController.createOrder);
router.get('/', OrderController.getAllOrders);

export const OrderRoutes = router;
