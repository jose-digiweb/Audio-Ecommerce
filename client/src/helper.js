import _ from 'lodash';
import { SHIPPING_COST, MESSAGE_START, MESSAGE_ENDS } from './config';
import * as API from './API/api';

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

export const cartCalc = products => {
  const total = products
    ?.map(item => item.price * item.quantity)
    ?.reduce((total, num) => total + Math.round(num), 0);
  const vat = Math.round((total * 20) / 100);
  const grandTotal = Math.round(total + SHIPPING_COST);
  const shippingCost = SHIPPING_COST;
  return [total, grandTotal, vat, shippingCost];
};

export const getUser = async () => {
  if (_.isEmpty(JSON.parse(localStorage.getItem('loggedUser'))) || undefined)
    return {};

  const { jwtToken, loggedUser } = JSON.parse(localStorage.getItem('loggedUser'));

  const { data } = await API.getUser(loggedUser.id);

  return { jwtToken, loggedUser: data };
};

export const headerStyle = () => {
  if (window.location.pathname === '/') return 'w-full absolute top-0 left-0 z-40';

  //
  if (window.location.pathname.startsWith('/me'))
    return 'w-full bg-black absolute top-0 left-0 z-40';

  //
  if (window.location.pathname.startsWith('/my-orders'))
    return 'w-full bg-black absolute top-0 left-0 z-40';

  //
  if (window.location.pathname.startsWith('/shipping-details'))
    return 'w-full bg-black absolute top-0 left-0 z-40';

  //
  if (window.location.pathname.startsWith('/profile-settings'))
    return 'w-full bg-black absolute top-0 left-0 z-40';

  //
  if (window.location.pathname === '/auth') return 'hidden';

  //
  if (window.location.pathname === '/admin/dashboard') return 'hidden';

  //
  if (window.location.pathname === '/success') return 'hidden';
  //
  else return 'w-full z-40 bg-black';
};
