import util from 'util';
import jwt from 'jsonwebtoken';

import User from '../models/userModel.js';
import Admin from '../models/adminModel.js';
import catchAsync from '../utils/catchAsyncError.js';
import globalError from '../utils/globalError.js';

const generateJwtToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

export const signUpAdmin = catchAsync(async (req, res, next) => {
  const adminData = {
    name: `${req.body.firstName} ${req.body.lastName}`,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.passwordConfirm,
    role: 'admin',
  };

  console.log(adminData);

  const newAdmin = await User.create(adminData);

  res.status(201).json(newAdmin);
});

export const signInAdmin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //1) check if email and password is provided
  if (!email || !password)
    return next(new globalError(401, 'Please provide a valid email and password'));

  //1) check if the password is correct
  const currentAdmin = await Admin.findOne({ email }).select('+password');

  console.log(currentAdmin);

  if (
    !currentAdmin ||
    !(await currentAdmin.correctPassword(password, currentAdmin.password))
  )
    return next(new globalError(401, 'Please provide a valid email or password'));

  //1) if its all good, then send the JsonWebToken to the client / signIn
  const jwtToken = generateJwtToken(currentAdmin._id);

  res.status(202).json({
    currentAdmin,
    jwtToken,
  });
});

export const signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    passwordChangedAt: req.body.passwordChangedAt,
  });

  const jwtToken = generateJwtToken(newUser._id);

  res.status(201).json({
    status: 'success',
    jwtToken,
    newUser,
  });
});

export const signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //1) check if email and password is provided
  if (!email || !password)
    return next(new globalError(400, 'Please provide  valid email and password!'));

  //1) check if the password is correct
  const currentUser = await User.findOne({ email }).select('+password');

  if (
    !currentUser ||
    !(await currentUser.checkPassword(password, currentUser.password))
  )
    return next(new globalError(401, 'The Email or Password is not correct!'));

  //1) if its all good, then send the JsonWebToken to the client / signIn
  const jwtToken = generateJwtToken(currentUser._id);

  const loggedUser = {
    name: currentUser.name,
    email: currentUser.email,
    role: currentUser.role,
    picture: currentUser.picture,
    id: currentUser._id,
  };

  res.status(202).json({
    jwtToken,
    loggedUser,
  });
});

export const protectRoute = catchAsync(async (req, res, next) => {
  //1) Get the jwtToken and check if it's there
  let jwtToken; // So we can access it outside the If Statement'

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    jwtToken = req.headers.authorization.split(' ')[1];
  }

  if (!jwtToken)
    return next(
      new globalError(401, 'You must be loggedIn to perform this action!')
    );

  //1) Validate the jwtToken
  const decodedToken = await util.promisify(jwt.verify)(
    jwtToken,
    process.env.JWT_SECRET
  );

  //1) Check if the user still exists
  const currentUser = await User.findById(decodedToken.id);

  if (!currentUser)
    return next(
      new globalError(
        401,
        'This user is no longer registered! Please create an account first.'
      )
    );

  //1) Check if user changed the password after the token was issued
  if (await currentUser.checkPasswordChanges(decodedToken.iat))
    return next(
      new globalError(
        401,
        'The password was changed in meantime, please login again!'
      )
    );

  //1) If it's all good, then call next (Access Granted)
  req.currentUser = currentUser; // Storing th current user in the request

  next();
});

export const restrictTo = (...roles) =>
  catchAsync(async (req, res, next) => {
    if (!roles.includes(req.currentUser.role))
      return next(
        new globalError(403, 'Only Admins are allowed to access this section.')
      );

    next();
  });
