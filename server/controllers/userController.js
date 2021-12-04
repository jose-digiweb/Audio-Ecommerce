import jwt from 'jsonwebtoken';

import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsyncError.js';
import globalError from '../utils/globalError.js';
import deleteOldPicture from '../utils/imageKitDeletePic.js';

const generateJwtToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

export const getUsers = async (req, res, next) => {
  const users = await User.find().populate('purchases');

  res.status(200).json(users);
};

export const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate('purchases');

  const loggedUser = {
    name: user.name,
    email: user.email,
    role: user.role,
    picture: user.picture,
    id: user._id,
    purchases: user.purchases || [],
    address: user.address || {},
  };

  res.status(200).json(loggedUser);
});

export const updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('+password');

  let userData;
  let correctPassword;

  if (!req.body.newPassword) {
    userData = {
      name: !req?.body?.name ? user?.name : req?.body?.name,
      email: !req?.body?.email ? user?.email : req?.body?.email,
      picture: !req?.body?.picture ? user?.picture : req?.body?.picture,
      address: {
        street: !req?.body?.street ? user?.address?.street : req?.body?.street,
        city: !req?.body?.city ? user?.address?.city : req?.body?.city,
        zipCode: !req?.body?.zipCode ? user?.address?.zipCode : req?.body?.zipCode,
        country: !req?.body?.country ? user?.address?.country : req?.body?.country,
      },
    };

    correctPassword = await user.checkPassword(req.body.password, user.password);

    if (!correctPassword)
      return next(new globalError(401, 'Password is not correct!'));

    const updatedUser = await User.findByIdAndUpdate(req.params.id, userData, {
      new: true,
      runValidators: true,
    });

    const editedUser = {
      name: updatedUser.name,
      email: updatedUser.email,
      picture: updatedUser.picture,
      role: updatedUser.role,
      address: updatedUser?.address,
      purchases: updatedUser?.purchases,
      id: updatedUser._id,
    };

    if (req.body.disposalPics) {
      deleteOldPicture(
        user?.picture?.picId,
        req?.body?.picture?.picId,
        req?.body?.disposalPics
      );
    }

    res.status(200).json(editedUser);
    //
  } else if (req.body.newPassword) {
    correctPassword = await user.checkPassword(
      req.body.currentPassword,
      user.password
    );

    if (!correctPassword) {
      return next(new globalError(401, 'Password is not correct!'));
    }

    user.password = req.body.newPassword;
    user.confirmPassword = req.body.confirmPassword;
    await user.save();

    const jwtToken = generateJwtToken(user._id);

    const loggedUser = {
      name: user.name,
      email: user.email,
      picture: user.picture,
      role: user.role,
      address: user?.address,
      purchases: user?.purchases,
      id: user._id,
    };

    res.status(200).json({ jwtToken, loggedUser });
  }
});

export const updateAddress = catchAsync(async (req, res, next) => {
  console.log(req.body);
});

export const deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(204).json({});
});
