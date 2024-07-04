
import { instance } from "../utils/razorpay.js";
import crypto from 'crypto';

export const createOrder = async (req, res) => {
    try{

        const amount = req.body.amount;
        console.log(amount);
        const options = {
            amount,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
        };
        const order = await instance.orders.create(options);
        res.json(order)
        console.log(order);
    }catch(err){
        console.log(err);
    }
}

export const verifyOrder = async (req, res) => {
    console.log(req.body);
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          req.body;
        const key_secret = process.env.RAZORPAY_KEY_SECRET;
        let hmac = crypto.createHmac('sha256', key_secret);
        hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
        const generated_signature = hmac.digest('hex');
        if (razorpay_signature === generated_signature) {
          res
            .status(200)
            .json({ success: true, message: 'Payment has been verified' });
        } else res.json({ success: false, message: 'Payment verification failed' });
      } catch (err) {
        console.log(err);
      }
}

