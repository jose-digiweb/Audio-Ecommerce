import axios from 'axios';

import { setRenderMessage } from '../helper';
import * as config from '../config';

const API = axios.create({ baseURL: 'http://localhost:3001/api/v1' });
// const API = axios.create({ baseURL: 'https://audiophille.herokuapp.com/api/v1'};

const API_NO_AUTH = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
  // baseURL: 'https://audiophille.herokuapp.com/api/v1',
});

API.interceptors.request.use(req => {
  const { jwtToken } = JSON.parse(localStorage.getItem('loggedUser'));
  req.headers.Authorization = `Bearer ${jwtToken}`;

  return req;
});

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

export const newSale = async (saleData, setShowMessage, setShowSuccessModal) => {
  try {
    await API_NO_AUTH.post('/sales/new', saleData);

    setShowSuccessModal(prev => !prev);
    window.scroll(0, 0);
    //
  } catch (err) {
    const { message } = err.response.data;

    setRenderMessage(setShowMessage, config.ERROR_MESSAGE(message));
  }
};
