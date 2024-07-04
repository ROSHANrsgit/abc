import express from 'express';
import dotenv from 'dotenv';
import paymentRoutes from './routes/paymentRoutes.js';
import cors from 'cors';
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use(paymentRoutes);

app.listen(PORT, ()=> {
    console.log('Backend Server listening on PORT ', PORT);
})