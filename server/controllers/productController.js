import ImageKit from 'imagekit';

import Product from '../models/productModel.js';
import GlobalError from '../utils/globalError.js';
import catchAsync from '../utils/catchAsyncError.js';

export const getProducts = async (req, res) => {
  const products = await Product.find();

  res.status(200).json({ products });
};

export const getProduct = catchAsync(async (req, res, next) => {
  const prodId = req.params.id;
  const product = await Product.findById(prodId);

  if (!product)
    return next(
      new GlobalError(
        404,
        'There is no product with this ID in our system. Please verify the product ID and try again.'
      )
    );

  res.status(200).json({ product });
});

export const createProduct = catchAsync(async (req, res, next) => {
  let images = [];

  req.body.images.map(image => {
    images.push({
      imageName: image.imageName,
      imageId: image.imageId,
      bigger: image.width > 500,
    });
  });

  const product = {
    name: req.body.name,
    description: req.body.description,
    features: req.body.features,
    includes: req.body.includes,
    coverImage: req.body.coverImage,
    category: req.body.category,
    price: req.body.price,
    images: images,
  };

  const newProduct = await Product.create(product);

  res.status(200).json(newProduct);
});

export const editProduct = catchAsync(async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    description: req.body.description,
    features: req.body.features,
    includes: req.body.includes,
    coverImage: req.body.coverImage,
    category: req.body.category,
    price: req.body.price,
    images: req.body.images,
  };

  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, newProduct, {
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: updatedProduct,
  });
});

export const deleteProduct = catchAsync(async (req, res, next) => {
  await Product.findByIdAndDelete(req.params.id);

  res.status(204).json({});
});

export const imagesUpload = catchAsync(async (req, res, next) => {
  const imageKit = new ImageKit({
    publicKey: 'public_BDqyaCrCNBcot/R+VnBaqtaWw8o=',
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
    urlEndpoint: 'https://ik.imagekit.io/beevfgcytiq/',
  });

  const authenticationParameters = imageKit.getAuthenticationParameters();
  const { token, expire, signature } = authenticationParameters;

  res.status(200).json({
    token,
    expire,
    signature,
  });
});
