import mongoose from 'mongoose';

import User from './userModel.js';

const salesSchema = new mongoose.Schema({
  products: [
    {
      name: String,
      id: String,
      price: Number,
      quantity: Number,
      image: String,
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
  total: { type: Number, required: true },
  quantity: Number,
  paymentMethod: String,
  client: {
    name: String,
    email: String,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

salesSchema.pre('save', async function (next) {
  if (this.user) {
    const saleId = this._id;
    const buyer = await User.findById(this.user);
    buyer.purchases.push(saleId);
    buyer.save({ validateBeforeSave: false });
  }

  this.quantity = this.products.length;

  next();
});

const Sales = new mongoose.model('Sales', salesSchema);
export default Sales;
