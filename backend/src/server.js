import * as dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import swaggerUI from 'swagger-ui-express';
import connectDB from './configs/connect-db.configs.js';
import rootRoutes from './routes/index.js';

dotenv.config();

const app = express();

//middlewares
app.use(express.json());

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:4200',
      'http://localhost:3001',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  }),
);

app.get('/', (_, res) => {
  res.send('hello world');
});

//conect db
connectDB();

//routes
app.use(`/api/v1`, rootRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('🚀 ~ app.listen ~ port:', port);
});

app.use(async (req, res) => {
  try {
    await func(req, res, next);
  } catch (error) {
    return res.status(500).json({
      messase: error.messase,
      success: false,
    });
  }
});
