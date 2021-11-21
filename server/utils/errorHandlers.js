import GlobalError from './globalError.js';

export const handleCastErrorDB = err => {
  const message = `${err.path} is not valid! Please verify the value: ${err.value}, and try again.`;

  return new GlobalError(400, message);
};

export const handleValidationErrorDB = err => {
  const message = Object.values(err.errors).map(e => e.message);

  return new GlobalError(400, `${message.join('. ')}`);
};

export const handleInvalidJwtToken = err => {
  const message = 'The verification token is invalid! Please Login again.';

  return new GlobalError(401, message);
};

export const handleExpiredJwtToken = err => {
  const message = 'Your verification token has expired! Please Login again.';

  return new GlobalError(401, message);
};
