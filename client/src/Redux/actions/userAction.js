import { getUser, setRenderMessage } from '../../helper';
import * as config from '../../config';
import * as API from '../../API/api';
import * as type from '../types';

export const editUserAction =
  (id, formData, setShowMessage, setInitValues, setReRender) => async dispatch => {
    try {
      let currType = !formData.newPassword ? type.EDIT_USER : type.PASSWORD_RESET;

      const { data } = await API.editUser(id, formData, setShowMessage);

      dispatch({ type: currType, payload: data });

      setRenderMessage(setShowMessage, config.SUCCESS_MESSAGE);

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

export const updateMeAction =
  (id, formData, setInitialValues, setShowMessage, setIsLogged, setPicData) =>
  async dispatch => {
    try {
      const { data } = await API.editUser(id, formData, setShowMessage);

      if (formData?.newPassword) {
        localStorage.setItem('loggedUser', JSON.stringify(data));
        setInitialValues(data?.loggedUser);
        setIsLogged(await getUser());
      }
      if (formData?.street) {
        setInitialValues(data?.address);
        setIsLogged(await getUser());
      }
      if (formData?.email) {
        setInitialValues(data);
        setPicData([data.picture]);
        setIsLogged(await getUser());
      }

      setRenderMessage(setShowMessage, config.SUCCESS_MESSAGE);
    } catch (err) {
      console.log(err);
    }
  };
