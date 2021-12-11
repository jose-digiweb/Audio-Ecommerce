import * as API from '../../API/api';
import * as type from '../types';

import galleryUpload from '../../Components/Dashboard/reusable/galleryUpload';

export const getProductsAction = () => async dispatch => {
  const { data } = await API.getProducts();

  dispatch({ type: type.GET_PRODUCTS, payload: data });
};

export const createProductAction =
  (productData, handleMessage) => async dispatch => {
    try {
      const { data } = await API.createProduct(productData, handleMessage);

      dispatch({ type: type.CREATE_PRODUCTS, payload: data });

      handleMessage('Product created successfully!', 'green');
    } catch (err) {
      console.log(err);
    }
  };

export const editProductAction =
  (id, formData, curProduct, history, handleMessage) => async dispatch => {
    try {
      const { data } = await API.editProduct(id, formData, handleMessage);

      dispatch({ type: type.EDIT_PRODUCT, payload: data });

      if (formData.images) {
        if (formData.name !== curProduct.name) {
          galleryUpload(formData.images, curProduct.name);
        } else {
          galleryUpload(formData.images, formData.name);
        }
      }

      history.push('/products');
    } catch (err) {
      console.log(err);
    }
  };

export const deleteProductAction = id => async dispatch => {
  await API.deleteProduct(id);

  dispatch({ type: type.DELETE_PRODUCT, payload: id });
};
