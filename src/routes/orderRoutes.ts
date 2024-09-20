import { Router } from 'express';
import { createOrder, getUserOrders } from '../controllers/orderController';
import { body } from 'express-validator';

const router = Router();

router.post(
  '/orders',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('fullName').notEmpty().withMessage('Full name is required'),
    body('fullAddress').notEmpty().withMessage('Full address is required'),
    body('imageUrls').isArray({ min: 1 }).withMessage('At least one image URL is required'),
    body('frameColor').notEmpty().withMessage('Frame color is required'),
    body('user').notEmpty().withMessage('User is required'),
  ],
  createOrder
);

router.get('/orders/user/:user', getUserOrders);

export default router;