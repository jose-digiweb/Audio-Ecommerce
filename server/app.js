//==> REQUESTING DEPENDENCIES
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import compression from 'compression';

//==> REQUESTING MODULES
import { stripeWebhook } from './controllers/salesController.js';
import productRouter from './routes/productRoutes.js';
import salesRouter from './routes/salesRoutes.js';
import userRouter from './routes/userRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import errorController from './controllers/errorController.js';
import GlobalError from './utils/globalError.js';

//==> STARTING THE APPLICATION
const app = express();

app.enable('trust proxy');

// logging the logger info
if (process.env.NODE_ENV === 'development') app.use(morgan(`dev`));

//==> GLOBAL MIDDLEWARES
app.use(cors());

app.use(compression());

//==> CREATING ROUTES
// Stripe Checkout
app.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

// Defining the Json as standard
app.use(express.json({ limit: '10mb' }));

// Product Router
app.use('/api/v1/products', productRouter);

// Sales Router
app.use('/api/v1/sales', salesRouter);

// User Router
app.use('/api/v1/users', userRouter);

// Admin Router
app.use('/api/v1/admin', adminRouter);

app.get('/', (req, res) => res.send('<h1>Welcome to Audiophile API!!!</h1>'));

// Not found Routes Error Handling
app.use('*', (req, res, next) => {
  const message = `Page not found! Please check if the URL (${req.originalUrl}) is correct.`;

  next(new GlobalError(404, message));
});

//==> GLOBAL ERROR HANDLING MIDDLEWARE
app.use(errorController);

export default app;
