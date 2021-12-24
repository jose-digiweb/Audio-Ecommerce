export const activeNavStyle = { color: '#D87D4A' };
export const activeProfileNavStyle = {
  backgroundColor: '#D87D4A',
  color: '#ffffff',
};

export const MESSAGE_SUCCESS = color => {
  return color === 'bg-green-600' ? 5000 : 8000;
};
export const MESSAGE_ERROR = 10000;
export const SHIPPING_COST = 50;

export const MESSAGE_START = 500;
export const MESSAGE_ENDS = color => {
  return color === 'bg-green-600' ? 5000 : 8000;
};
export const SUCCESS_MESSAGE = {
  text: 'Details updated successfully!',
  color: 'bg-green-600',
};
export const SUCCESS_SIGNUP = {
  text: 'Account created successfully!',
  color: 'bg-green-600',
};
export const ERROR_MESSAGE = message => {
  return { text: message, color: 'bg-red-600' };
};

export const STRIPE_KEY =
  'pk_test_51JvkAEIEt9TMRCX6mvHJhBrftJ7MWuY4aUtAHjglaGyBm2jxrdaaD5OGs8vPLyAHOUrcYQeJaQ9vCupTcDrgqRFu00eBfMz3nY';
