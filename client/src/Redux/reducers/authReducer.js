import * as type from '../types';

const authReducer = (state = { loggedUser: null, newAdmin: null }, action) => {
  switch (action.type) {
    case type.LOGIN:
      localStorage.setItem('loggedUser', JSON.stringify({ ...action?.payload }));
      return {
        ...state,
        loggedUser: action.payload,
      };

    //
    case type.LOGOUT:
      return { ...state, loggedUser: action.payload };

    //
    case type.SIGN_UP_ADMIN:
      return { ...state, newAdmin: action.payload };

    //
    case type.EDIT_USER:
      const { jwtToken } = JSON.parse(localStorage.getItem('loggedUser'));
      const currentUser = { jwtToken, loggedUser: action?.payload };
      localStorage.setItem('loggedUser', JSON.stringify({ ...currentUser }));
      return {
        ...state,
        loggedUser: currentUser,
      };

    //
    case type.PASSWORD_RESET:
      const { loggedUser } = JSON.parse(localStorage.getItem('loggedUser'));
      const user = { jwtToken: action.payload, loggedUser };
      localStorage.setItem('loggedUser', JSON.stringify({ ...user }));
      return {
        ...state,
        loggedUser: user,
      };
    default:
      return state;
  }
};

export default authReducer;
