import * as API from '../../API/api';
import * as type from '../types';

import galleryUpload from '../../components/Dashboard/reusable/galleryUpload';

export const signUpAdminAction =
  (formData, handleMessage, setInitValues) => async dispatch => {
    try {
      const { data } = await API.signupAdmin(formData, handleMessage);

      dispatch({ type: type.SIGN_UP_ADMIN, payload: data });

      handleMessage('Admin created successfully!', 'green');

      setInitValues({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (err) {
      console.log(err);
    }
  };

export const logInAction =
  (formData, history, handleMessage, desktopViewport) => async dispatch => {
    try {
      const { data } = await API.logIn(formData, handleMessage);

      dispatch({ type: type.LOGIN, payload: data });

      if (data.loggedUser.role === 'admin' && desktopViewport) {
        history.push('/admin/dashboard');
      } else {
        history.push('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

export const logOutAction = setIsLogged => dispatch => {
  localStorage.removeItem('loggedUser');
  setIsLogged(null);

  dispatch({ type: type.LOGOUT, payload: null });
};

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

export const deleteProductAction = id => async dispatch => {
  await API.deleteProduct(id);

  dispatch({ type: type.DELETE_PRODUCT, payload: id });
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

export const editUserAction =
  (id, formData, handleMessage, setInitValues, setReRender) => async dispatch => {
    try {
      let currType = !formData.newPassword ? type.EDIT_USER : type.PASSWORD_RESET;

      const { data } = await API.editUser(id, formData, handleMessage);

      dispatch({ type: currType, payload: data });

      handleMessage('Details updated successfully!', 'green');

      setInitValues({
        firstName: data?.name?.split(' ')[0],
        lastName: data?.name?.split(' ')[1],
        email: data?.email,
        password: '',
        actualPassword: '',
        newPassword: '',
        confirmPassword: '',
      });

      setReRender(prev => !prev);
    } catch (err) {
      console.log(err);
    }
  };

export const addToCartAction = newProduct => dispatch => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  if (cartItems.length > 0) {
    if (cartItems.filter(item => item.id === newProduct.id).length > 0) return;
  }

  cartItems?.push(newProduct);

  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  dispatch({ type: type.ADD_PRODUCT, payload: cartItems });
};

export const updateCartAction = productData => dispatch => {
  if (!productData.quantity) return;

  const cartItems = JSON.parse(localStorage.getItem('cartItems'));

  const itemIndex = cartItems.findIndex(item => item.id === productData.id);

  cartItems[itemIndex].quantity = productData.quantity;

  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  dispatch({ type: type.EDIT_CART, payload: cartItems });
};

export const removeProductAction = productId => dispatch => {
  let cartItems;
  if (!productId) {
    cartItems = [];
    localStorage.removeItem('cartItems');
  }

  if (productId) {
    cartItems = JSON.parse(localStorage.getItem('cartItems')).filter(
      item => item.id !== productId
    );

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  dispatch({ type: type.REMOVE_PRODUCT, payload: cartItems });
};
