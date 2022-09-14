import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/errorHandler';
import CarRoute from './routes/car';

const app = express();

app.use(express.json());
app.use(CarRoute);
app.use(errorHandler);

export default app;
