import express from 'express';

import {
  signUp,
  signIn,
  restrictTo,
  protectRoute,
} from '../controllers/authController.js';

import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

const router = express.Router();

router.route('/signup').post(signUp);
router.route('/signin').post(signIn);
router.route('/').get(protectRoute, restrictTo('admin'), getUsers);

router
  .route('/:id')
  .get(protectRoute, getUser)
  .patch(protectRoute, updateUser)
  .delete(protectRoute, deleteUser);

export default router;
