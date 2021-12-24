import Sales from '../models/SalesModel.js';
import GlobalError from '../utils/globalError.js';
import catchAsync from '../utils/catchAsyncError.js';
import stripe from 'stripe';
const Stripe = stripe(process.env.STRIPE_SECRETE_KEY);
const endpointSecret = process.env.STRIPE_SECRETE_KEY;

export const newSale = catchAsync(async (req, res, next) => {
  const newSale = await Sales.create(req.body);

  res.status(200).json({
    status: 'success',
    data: newSale,
  });
});

export const getSales = async (req, res, next) => {
  const sales = await Sales.find({}).populate('user');

  res.status(200).json({
    status: 'success',
    data: sales,
  });
};

export const stripePayment = async (req, res, next) => {
  const paymentIntent = await Stripe.paymentIntents.create({
    amount: 5000,
    currency: 'usd',
    payment_method_types: ['card'],
  });

  res.status(200).json({ clientSecret: paymentIntent.client_secret });
};

export const stripeWebhook = async (req, res, next) => {
  let event = req.body;

  const signature = req.headers['stripe-signature'];

  if (endpointSecret) {
    try {
      event = Stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.sendStatus(400);
    }
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;

      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  res.send();
};
