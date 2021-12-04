import express from 'express';

import { newSale, getSales } from '../controllers/salesController.js';

const router = express.Router();

router.route('/').get(getSales);
router.route('/new').post(newSale);

export default router;
