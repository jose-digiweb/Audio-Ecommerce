import _ from 'lodash';
import * as type from '../types';

const productsReducer = (state = {}, action) => {
  switch (action.type) {
    case type.GET_PRODUCTS:
      return { ...state, ...action.payload };

    //
    case type.CREATE_PRODUCTS:
      return { ...state, ...action.payload };

    //
    case type.DELETE_PRODUCT:
      return _.omit(state, action.payload);

    //
    default:
      return state;
  }
};

export default productsReducer;
