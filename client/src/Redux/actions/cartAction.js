import * as type from '../types';

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
