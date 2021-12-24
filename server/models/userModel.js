import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    //Validators
    required: [true, 'You must enter a Name'],
    maxLength: 20,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,

    //Validators
    required: [true, 'You must enter an Email'],
    unique: [true, 'There is already an account using this email address'],
    validate: [validator.isEmail, 'Please enter a valid email address'],
  },
  picture: { picName: String, picId: String },
  password: {
    type: String,
    select: false,

    //Validators
    required: [true, 'You must enter a Password'],
    minlength: [8, 'The password must have minimum of 8 characters'],
  },
  confirmPassword: {
    type: String,

    //Validators
    required: [true, 'You must confirm your Password'],
    validate: {
      validator: function (passConfirm) {
        return passConfirm === this.password;
      },
      message: `Passwords did not match! Please try again.`,
    },
  },
  passwordChangedAt: Date,
  role: {
    type: String,
    default: 'user',
  },
  address: {
    street: String,
    city: String,
    zipCode: Number,
    country: String,
  },
  phoneNumber: Number,
  purchases: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Sales',
    },
  ],
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.confirmPassword = undefined;

  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;

  next();
});

// Comparing password to verify users identiy (on login)
userSchema.methods.checkPassword = async function (inputPassword, savedPassword) {
  // Will return True or False
  return await bcrypt.compare(inputPassword, savedPassword);
};

// Checking if the user changed password after the JWT was Issued
userSchema.methods.checkPasswordChanges = async function (jwtTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

    return changedTimeStamp > jwtTimestamp;
  }

  // False mean Not Changed
  return false;
};

const User = mongoose.model('User', userSchema);

export default User;
