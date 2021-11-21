import express from 'express';

import {
  signUpAdmin,
  restrictTo,
  protectRoute,
} from '../controllers/authController.js';

const router = express.Router();

router.route('/signup').post(protectRoute, restrictTo('admin'), signUpAdmin);

export default router;
