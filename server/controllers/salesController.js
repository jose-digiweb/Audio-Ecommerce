import Sales from '../models/SalesModel.js';
import GlobalError from '../utils/globalError.js';
import catchAsync from '../utils/catchAsyncError.js';

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
