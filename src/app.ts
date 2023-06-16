import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
// import globalErrorHandler from './app/middlewares/globalErrorHandler';
// import routers from './app/routes';
import httpStatus from 'http-status';

const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // Application routes
// app.use('/api/v1', routers);

// // global errors handler
// app.use(globalErrorHandler);

//handle notFound Route error
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: true,
    message: '',
    errorMessages: [
      {
        path: '',
        message: 'API not Found',
      },
    ],
  });
  next();
});

export default app;
