import { useMediaQuery } from 'react-responsive';
import validator from 'validator';
import _ from 'lodash';

import {
  SHIPPING_COST,
  MESSAGE_START,
  MESSAGE_ENDS,
  activeNavStyle,
  activeProfileNavStyle,
} from './config';
import * as API from './API/api';

export const nameShortcut = name => {
  const firstLetter = name.trim().split(' ').slice(0, 1)[0][0];
  const secondLetter = name.trim().split(' ').slice(-1)[0][0];
  const shortName = `${firstLetter} ${secondLetter}`;

  return shortName;
};

export const setRenderMessage = (setShowMessage, message) => {
  setTimeout(() => {
    setShowMessage(prev => ({ ...prev, show: true }));
    setShowMessage(prev => ({ ...prev, payload: message }));

    setTimeout(() => {
      setShowMessage(prev => ({ ...prev, show: false }));
      setShowMessage(prev => ({ ...prev, payload: {} }));
    }, MESSAGE_ENDS(message.color));
  }, MESSAGE_START);
};

export const formatNumber = number => {
  return new Intl.NumberFormat().format(number);
};

export const activeNavLink = ({ isActive }) => {
  return isActive ? activeNavStyle : undefined;
};

export const activeProfileLink = ({ isActive }) => {
  return isActive ? activeProfileNavStyle : undefined;
};

export const cartCalc = products => {
  const total = products
    ?.map(item => item.price * item.quantity)
    ?.reduce((total, num) => total + Math.round(num), 0);
  const vat = Math.round((total * 20) / 100);
  const grandTotal = Math.round(total + 50);
  const shippingCost = SHIPPING_COST;

  return [total, grandTotal, vat, shippingCost];
};

export const getUser = async () => {
  try {
    if (_.isEmpty(JSON.parse(localStorage.getItem('loggedUser'))) || undefined)
      return {};

    const { jwtToken, loggedUser } = JSON.parse(localStorage.getItem('loggedUser'));

    const { data } = await API.getUser(loggedUser.id);

    return { jwtToken, loggedUser: data };
  } catch (err) {
    console.log(err);
  }
};

export const headerStyle = location => {
  if (location?.pathname === '/') return 'w-full absolute top-0 left-0 z-40';

  //
  if (location?.pathname.startsWith('/users'))
    return 'w-full absolute top-0 left-0 z-40 bg-black';

  //
  if (location?.pathname === '/auth') return 'hidden';

  //
  if (location?.pathname === '/admin/dashboard') return 'hidden';

  //
  if (location?.pathname === '/success') return 'hidden';
  //
  else return 'w-full z-40 bg-black';
};

export const useValidate = () => {
  const validateField = (name, value) => {
    let result;
    if (name === 'email') {
      result = validator.isEmail(value || 'hey@gmail.com');
    }
    if (name === 'name') {
      result = validator.isLength(value || 'hi there', { min: 6 });
    }
    if (name === 'zipCode') {
      result = validator.isPostalCode(value || '12345', ['US']);
    }
    if (name === 'number') {
      result = isNaN(value || 5);
    }
    return result;
  };

  const buttonValidation = (valid, values) => {
    if (values.paymentMethod === 'eMoney') {
      return valid && Object.keys(values).length > 9 ? true : false;
    }
    if (values.paymentMethod === 'cashOnDelivery') {
      return valid && Object.keys(values).length > 7 ? true : false;
    }
    if (values.paymentMethod === 'card') {
      return valid && Object.keys(values).length > 7 ? true : false;
    }
  };

  const paymentMethod = (valid, values) => {
    return valid && Object.keys(values).length > 6 ? true : false;
  };

  return [validateField, buttonValidation, paymentMethod];
};

export const imageTransform = (desk, tab, small) => {
  let imageTransform;

  if (desk) {
    imageTransform = { width: '70px', radius: 10 };
  }
  if (tab) {
    imageTransform = { width: '70px', radius: 10 };
  }
  if (small) {
    imageTransform = { width: '60px', radius: 10 };
  }

  return imageTransform;
};

export const View = () => {
  const desktop = useMediaQuery({ minWidth: 1280 });
  const tablet = useMediaQuery({ minWidth: 501, maxWidth: 1279 });
  const mobile = useMediaQuery({ maxWidth: 500 });
  const profileNav = useMediaQuery({ maxWidth: 700 });

  return { desktop, tablet, mobile, profileNav };
};
