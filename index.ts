import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoute';
import blogRouter from './routes/blogRoutes';
import connectDB from './config/db';

// Load environment variables
dotenv.config();

let clientUrl = process.env.CLIENT_URL;

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
    origin: clientUrl,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Role'] 
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

// Connect to the database
connectDB();

// Routes
app.use('/user', userRouter);
app.use('/blogs',blogRouter)


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
