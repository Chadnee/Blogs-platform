import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(express.json());
app.use(cors({origin: ['http://localhost:5173']}));
app.use(cookieParser()) //set refresh token from cookies in request to pass

app.use('/api', router);
app.use(globalErrorHandler);
app.use(notFound)

app.get('/', (req: Request, res: Response) => {
  // const a =10
  // console.log(a)
  res.send('Hello World!');
});

export default app;
