import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import slugify from 'slugify';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,

    // Validations
    required: [true, 'The product must have a name!'],
    unique: true,
    maxLength: [30, 'The product name must have less then 30 characters'],
    minLength: [4, 'The product name must be greater then 10 characters'],
  },
  slug: String,
  price: {
    type: Number,

    // Validations
    required: [true, 'The product must have a price!'],
  },
  description: {
    type: String,
    trim: true,

    // Validations
    required: [true, 'The product must have a description!'],
  },
  features: {
    type: String,
    trim: true,

    // Validations
    required: [true, 'The product must have some features!'],
  },
  coverImage: {
    imageName: { type: String, required: [true, 'The product must a cover image!'] },
    imageId: { type: String, required: [true, 'The product must a cover image!'] },
  },
  images: [
    {
      imageName: {
        type: String,
        required: [true, 'The product image must some images!'],
      },
      imageId: {
        type: String,
      },
      bigger: { type: Boolean, default: false },
      imageUrl: String,
    },
  ],
  category: {
    type: String,
    trim: true,

    // Validations
    required: [true, 'The product must belong to a category!'],
    enum: {
      values: ['headphones', 'earphones', 'speakers'],
      message: `The category must be either 'headphones', 'earphones' or 'speakers'`,
    },
  },
  new: Boolean,
  createdAt: { type: Date, default: Date.now() },
  includes: [
    {
      quantity: {
        type: Number,
        required: [
          true,
          'A product must inform how much of this item comes inside of the box.',
        ],
      },
      item: {
        type: String,

        required: [true, 'A product must inform what comes inside of the box.'],
      },
    },
  ],
});

productSchema.plugin(uniqueValidator, {
  type: 'mongoose-unique-validator',
  message: `There is already a product with this {PATH}! Please choose a different one.`,
});

productSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  this.images.imageUrl = slugify(this.name, { lower: false });

  next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;
