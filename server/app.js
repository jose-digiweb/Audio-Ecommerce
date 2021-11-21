//==> REQUESTING DEPENDENCIES
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
// import busboy from 'connect-busboy';

//==> REQUESTING MODULES
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import errorController from './controllers/errorController.js';
import GlobalError from './utils/globalError.js';

//==> STARTING THE APPLICATION
const app = express();

// logging the logger info
if (process.env.NODE_ENV === 'development') app.use(morgan(`dev`));

//==> GLOBAL MIDDLEWARES
app.use(cors());

// Defining the Json as standard
app.use(express.json({ limit: '10mb' }));

//==> CREATING ROUTES
// Product Router
app.use('/api/v1/products', productRouter);

// User Router
app.use('/api/v1/users', userRouter);

// Admin Router
app.use('/api/v1/admin', adminRouter);

// Not found Routes Error Handling
app.use('*', (req, res, next) => {
  const message = `Page not found! Please check if the URL (${req.originalUrl}) is correct.`;

  next(new GlobalError(404, message));
});

//==> GLOBAL ERROR HANDLING MIDDLEWARE
app.use(errorController);

export default app;
