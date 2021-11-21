import { SHIPPING_COST } from './config';

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
