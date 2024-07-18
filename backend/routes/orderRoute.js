import express from 'express';
import { placeOrder, usersOrders, verifyOrder } from '../controllers/orderController.js';
import authMiddleware from '../middleware/auth.js';


const orderRouter = express.Router();


// API Endpoints
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, usersOrders);



export default orderRouter;
