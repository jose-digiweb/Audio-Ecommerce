import axios from 'axios';

const API = axios.create({ baseURL: 'https://audiophille.herokuapp.com/api/v1' });

const API_NO_AUTH = axios.create({
  baseURL: 'https://audiophille.herokuapp.com/api/v1',
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

export const logIn = (formData, handleMessage) =>
  API_NO_AUTH.post('/users/signin', formData).catch(err => {
    const { message } = err.response.data;

    handleMessage(message, 'red');
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

export const editUser = (id, formData, handleMessage) =>
  API.patch(`/users/${id}`, formData).catch(err => {
    const { message } = err.response.data;

    handleMessage(message, 'red');
  });
