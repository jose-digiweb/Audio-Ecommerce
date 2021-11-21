import express from 'express';

import { protectRoute, restrictTo } from '../controllers/authController.js';

import {
  getProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
  imagesUpload,
} from '../controllers/productController.js';

//==> CREATING PRODUCT ROUTER
const router = express.Router();

// ImageKit Authentication end-point
router.route('/images').get(imagesUpload);

router.route('/').get(getProducts);

router.route('/').post(protectRoute, restrictTo('admin'), createProduct);

router
  .route('/:id')
  .get(protectRoute, restrictTo('admin'), getProduct)
  .patch(protectRoute, restrictTo('admin'), editProduct)
  .delete(protectRoute, restrictTo('admin'), deleteProduct);

export default router;
