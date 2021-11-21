import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema({
  name: {
    type: String,

    //validators
    required: [true, 'You must enter a name.'],
    maxLength: [15, 'A name must have maximum of 15 characters.'],
    minLength: [5, 'A name must have minimum of 5 characters.'],
  },
  email: {
    type: String,
    lowercase: true,

    //validators
    unique: [true, 'Email already exists.'],
    required: [true, 'You must provide an email address.'],
    validate: [validator.isEmail, 'Please enter a valid email address.'],
  },
  password: {
    type: String,

    //validators
    required: [true, 'Please enter a Password.'],
    minlength: [8, 'The password must have minimum of 8 characters.'],
    select: false,
  },
  passwordConfirm: {
    type: String,

    //validator
    required: [true, 'Please confirm your Password.'],
    validate: {
      validator: function (passConfirm) {
        return this.password === passConfirm;
      },

      message: 'The passwords do not match.',
    },
  },
  passwordChangedAt: Date,
  role: { type: String, default: 'admin' },
});

adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

adminSchema.methods.correctPassword = async (typedPassword, savedPassword) => {
  return await bcrypt.compare(typedPassword, savedPassword);
};

// Checking if the user changed password after the JWT was Issued
adminSchema.methods.checkPasswordChanges = async function (jwtTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

    return changedTimeStamp > jwtTimestamp;
  }

  // False mean Not Changed
  return false;
};

const AdminUser = new mongoose.model('AdminUser', adminSchema);

export default AdminUser;
