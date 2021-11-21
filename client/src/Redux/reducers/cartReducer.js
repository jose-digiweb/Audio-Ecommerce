import * as type from '../types';

const cartReducer = (state = [], action) => {
  switch (action.type) {
    case type.ADD_PRODUCT:
      return [...action.payload];

    case type.REMOVE_PRODUCT:
      return [...action.payload];

    case type.EDIT_CART:
      return [...action.payload];

    //
    default:
      return state;
  }
};

export default cartReducer;
