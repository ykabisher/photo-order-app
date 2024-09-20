import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import Order from '../models/Order';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors in createOrder', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, fullName, fullAddress, imageUrls, frameColor, user } = req.body;

    // Create new order
    const newOrder = new Order({
      email,
      fullName,
      fullAddress,
      imageUrls,
      frameColor,
      user,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.log('Error creating order', error);
    next(error);
  }
};

export const getUserOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req.params;

    if (!user) {
      return res.status(400).json({ message: 'User parameter is required' });
    }

    const orders = await Order.find({ user });

    res.json(orders);
  } catch (error) {
    console.log('Error fetching user orders', error);
    next(error);
  }
};