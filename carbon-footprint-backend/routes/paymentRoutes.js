import express from 'express';
import {createOrder, verifyOrder} from '../controller/paymentController.js'

const router = express.Router();

router.post('/create/orderId', createOrder);
router.post('/api/payment/verify', verifyOrder);

export default router;