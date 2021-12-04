export const MESSAGE_SUCCESS = color => {
  return color === 'green' ? 5000 : 8000;
};
export const MESSAGE_ERROR = 10000;
export const SHIPPING_COST = 50;

export const MESSAGE_START = 500;
export const MESSAGE_ENDS = color => {
  return color === 'green' ? 5000 : 8000;
};
export const SUCCESS_MESSAGE = {
  text: 'Details updated successfully!',
  color: 'green',
};
export const SUCCESS_SIGNUP = {
  text: 'Account created successfully!',
  color: 'green',
};
export const ERROR_MESSAGE = message => {
  return { text: message, color: 'red' };
};
