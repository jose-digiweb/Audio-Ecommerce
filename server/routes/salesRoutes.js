import express from 'express';

import {
  newSale,
  getSales,
  stripePaymentIntent,
} from '../controllers/salesController.js';

const router = express.Router();

router.route('/').get(getSales);
router.route('/new').post(newSale);

//Stripe
router.route('/stripe-checkout').post(stripePaymentIntent);

export default router;
