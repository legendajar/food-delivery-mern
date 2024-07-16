import express from 'express';
import { placeOrder } from '../controllers/orderController.js';
import authMiddleware from '../middleware/auth.js';


const orderRouter = express.Router();


// API Endpoints
orderRouter.post("/place", authMiddleware, placeOrder);



export default orderRouter;
