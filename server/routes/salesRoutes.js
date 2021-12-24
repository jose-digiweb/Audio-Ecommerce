import express from 'express';

import {
  newSale,
  getSales,
  stripePayment,
  stripeWebhook,
} from '../controllers/salesController.js';

const router = express.Router();

router.route('/').get(getSales);
router.route('/new').post(newSale);

router.route('/new-stripe').get(stripePayment);
router
  .route('/webhook')
  .post(express.raw({ type: 'application/json' }), stripeWebhook);

export default router;
