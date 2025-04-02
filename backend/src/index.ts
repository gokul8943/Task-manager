import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDb } from './config/dbConnect';
import userRouter from './routes/authRoutes';

dotenv.config();
const app = express();

const Port = process.env.PORT || 3000

const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};

connectDb();

app.use(cors(corsOptions));
app.use(express.json());


app.use('/user',userRouter)


app.listen(Port, () => {
    console.log('Server is running on port 3000');
});