import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsyncError.js';
import globalError from '../utils/globalError.js';
import jwt from 'jsonwebtoken';

const generateJwtToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

export const getUsers = async (req, res, next) => {
  const users = await User.find();

  res.status(200).json(users);
};

export const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json(user);
});

export const updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('+password');

  let userData;
  let correctPassword;

  if (!req.body.newPassword) {
    userData = {
      name: req.body.name,
      email: req.body.email,
      picture: req?.body?.picture,
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
      id: updatedUser._id,
    };

    res.status(200).json(editedUser);
    //
  } else if (req.body.newPassword) {
    correctPassword = await user.checkPassword(
      req.body.actualPassword,
      user.password
    );

    if (!correctPassword) {
      return next(new globalError(401, 'Password is not correct!'));
    }

    user.password = req.body.newPassword;
    user.confirmPassword = req.body.confirmPassword;
    await user.save();

    const jwtToken = generateJwtToken(user._id);
    res.status(200).json(jwtToken);
  }
});

export const deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(204).json({});
});
