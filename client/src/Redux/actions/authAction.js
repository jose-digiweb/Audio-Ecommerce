import { getUser, setRenderMessage } from '../../helper';
import * as config from '../../config';
import * as API from '../../API/api';
import * as type from '../types';

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

export const signupUserAction =
  (formData, setShowMessage, setIsLogged, navigate) => async dispatch => {
    try {
      const { data } = await API.signupUser(formData, setShowMessage);

      setRenderMessage(setShowMessage, config.SUCCESS_SIGNUP);

      localStorage.setItem('loggedUser', JSON.stringify(data));
      setIsLogged(await getUser());

      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

export const logInAction =
  (formData, navigate, setShowMessage, desktopViewport, setIsLogged) =>
  async dispatch => {
    try {
      const { data } = await API.logIn(formData, setShowMessage);

      dispatch({ type: type.LOGIN, payload: data });

      setIsLogged(data);

      if (data.loggedUser.role === 'admin' && desktopViewport) {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

export const logOutAction = (navigate, setIsLogged, setCurrentUser) => dispatch => {
  localStorage.removeItem('loggedUser');
  setIsLogged({});
  setCurrentUser({});
  navigate('/');

  dispatch({ type: type.LOGOUT, payload: {} });
};
