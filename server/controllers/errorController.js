import devError from '../utils/devError.js';
import prodError from '../utils/prodError.js';
import {
  handleCastErrorDB,
  handleValidationErrorDB,
  handleInvalidJwtToken,
  handleExpiredJwtToken,
} from '../utils/errorHandlers.js';

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') return devError(err, res);

  if (process.env.NODE_ENV === 'production') {
    if (err.name === 'CastError') {
      err = handleCastErrorDB(err);
    }

    if (err.name === 'ValidationError') {
      err = handleValidationErrorDB(err);
    }

    if (err.name === 'JsonWebTokenError') {
      err = handleInvalidJwtToken(err);
    }

    if (err.name === 'TokenExpiredError') {
      err = handleExpiredJwtToken(err);
    }

    return prodError(err, res);
  }
};
