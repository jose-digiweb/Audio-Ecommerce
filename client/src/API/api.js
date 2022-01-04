import axios from 'axios';

import { setRenderMessage } from '../helper';
import * as config from '../config';

const API = axios.create({
  // baseURL: 'http://localhost:3001/api/v1',
  baseURL: 'https://apiaudiophile.herokuapp.com/api/v1',
});

const API_NO_AUTH = axios.create({
  // baseURL: 'http://localhost:3001/api/v1',
  baseURL: 'https://apiaudiophile.herokuapp.com/api/v1',
});

API.interceptors.request.use(req => {
  const { jwtToken } = JSON.parse(localStorage.getItem('loggedUser'));
  req.headers.Authorization = `Bearer ${jwtToken}`;

  return req;
});

export const getSecret = async (saleData, setStripeClientKey) => {
  try {
    const { data } = await API_NO_AUTH.post('/sales/stripe-checkout', saleData);

    setStripeClientKey(data.clientSecret);
  } catch (err) {
    console.log(err.message);
  }
};

export const signupAdmin = (formData, handleMessage) =>
  API.post('/admin/signup', formData).catch(err => {
    const { message } = err.response.data;

    handleMessage(message, 'red');
    console.log(err);
  });

export const signupUser = (formData, setShowMessage) =>
  API_NO_AUTH.post('/users/signup', formData).catch(err => {
    const { message } = err.response.data;

    setRenderMessage(setShowMessage, config.ERROR_MESSAGE(message));
    console.log(err);
  });

export const logIn = (formData, setShowMessage) =>
  API_NO_AUTH.post('/users/signin', formData).catch(err => {
    const { message } = err.response.data;

    setRenderMessage(setShowMessage, config.ERROR_MESSAGE(message));
  });

export const getProducts = () => API_NO_AUTH.get('/products');

export const createProduct = (productData, handleMessage) =>
  API.post('/products', productData).catch(err => {
    const { message } = err?.response?.data;

    handleMessage(message, 'red');
  });

export const deleteProduct = id => API.delete(`/products/${id}`);

export const editProduct = (id, formData, handleMessage) =>
  API.patch(`/products/${id}`, formData).catch(err => {
    const { message } = err.response.data;

    handleMessage(message, 'red');
  });

export const editUser = (id, formData, setShowMessage) =>
  API.patch(`/users/${id}`, formData).catch(err => {
    const { message } = err.response.data;

    setRenderMessage(setShowMessage, config.ERROR_MESSAGE(message));
  });

export const getUser = id =>
  API.get(`/users/${id}`).catch(err => {
    const { message } = err.response.data;

    console.log(message);
  });

export const newSale = async (
  saleData,
  setShowMessage,
  setShowSuccessModal,
  navigate
) => {
  try {
    await API_NO_AUTH.post('/sales/new', saleData);

    setShowSuccessModal(prev => !prev);
    navigate('/checkout/success');
    window.scroll(0, 0);
    //
  } catch (err) {
    const { message } = err.response.data;

    setRenderMessage(setShowMessage, config.ERROR_MESSAGE(message));
  }
};

export const forgotPassword = async (
  email,
  setEmail,
  setShowMessage,
  setShowSuccessMessage
) => {
  try {
    await API_NO_AUTH.post('users/forgot-password', { email });

    setShowSuccessMessage(true);
    setEmail('');
  } catch (err) {
    const { message } = err.response.data;

    setRenderMessage(setShowMessage, config.ERROR_MESSAGE(message));
  }
};

export const resetPassword = async (token, setAllowed) => {
  try {
    const res = await API_NO_AUTH.get(`users/forgot-password/${token}`);

    setAllowed({ status: res.status, message: '' });

    //
  } catch (err) {
    let message = err.response.data.message;

    if (message.includes('expired')) {
      message = 'This link has expired, please request a new one.';
    } else if (message.includes('invalid signature')) {
      message = 'This link has been compromised, please request a new one.';
    } else message = 'Something went wrong. Please try to request a new link.';

    console.log(message);

    setAllowed({ status: err.response.status, message });
  }
};

export const newPassword = async (data, setShowMessage, navigate) => {
  try {
    await API_NO_AUTH.post(`users/reset-password`, data);

    setRenderMessage(setShowMessage, {
      text: 'Password reset successfully!',
      color: 'bg-green-600',
    });

    navigate('/auth');
    //
  } catch (err) {
    let message = err.response.data.message;

    if (message.includes('Passwords did not')) {
      message = 'Passwords did not match! Please try again.';
    } else if (message.includes('You must enter')) {
      message = 'You must enter and confirm your new password!';
    } else {
      message = 'Something went wrong. Please try again.';
    }

    console.log(message);

    setRenderMessage(setShowMessage, config.ERROR_MESSAGE(message));
  }
};
