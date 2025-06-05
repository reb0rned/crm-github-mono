import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/authRoutes';
import projectRouter from './routes/projectRoutes';

dotenv.config()
const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());
//ROUTES
app.use('/api', authRouter)
app.use('/api', projectRouter)

// test route
app.get('/', (req: Request, res: Response) => {
  res.send('Server is running!');
});


const startingFunc = async () => {
  try {
    if (!MONGODB_URI) {
      throw new Error('Cannot find env variable for mongoDb!')
    }
    await mongoose.connect(MONGODB_URI)
    console.log('MongoDb connected!')

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch(error) {
    console.error('Error connecting to MongoDB or starting server:', error);
    process.exit(1)
  }
}
startingFunc()
