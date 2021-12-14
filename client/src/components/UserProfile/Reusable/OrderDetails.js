import React from 'react';

import { formatNumber } from '../../../helper';
import ImageRender from '../../reusables/ImageRender';

const OrderDetails = ({ setShowOrderDetails, currentPurchase }) => {
  const handleOverlayClick = () => {
    setShowOrderDetails(false);
  };

  return (
    <div className='absolute w-full h-screen flex justify-center items-center top-0 left-0 bg-black bg-opacity-50 z-50'>
      <div className='relative bg-gray px-6 py-6 rounded'>
        <div
          onClick={handleOverlayClick}
          className='absolute top-2 right-2 opacity-50 hover:opacity-90 cursor-pointer'
        >
          <ImageRender url='shared/desktop' path='closeBlack.svg' />
        </div>

        <div className='mb-4 pb-2 border-b-2'>
          <h6 className='mb-2'>
            {currentPurchase.products.length > 1 ? 'Products' : 'Product'}
          </h6>

          {currentPurchase.products.map(product => (
            <div key={product.id} className='flex justify-between mb-2'>
              <p className='w-56 font-body text-1xl mr-6'>{product.name}</p>

              <p className='font-body text-1xl mr-6'>x{product.quantity}</p>

              <p className='font-body text-1xl'>${formatNumber(product.price)}</p>
            </div>
          ))}
        </div>

        <div className='w-full flex justify-between'>
          <div className='flex flex-col mr-4'>
            <p className='font-bold mr-2'>Date</p>
            <p className='text-1xl font-body'>
              {currentPurchase.date.split('T')[0]}
            </p>
          </div>

          <div className='flex flex-col mr-4'>
            <p className='font-bold mr-2'>Payment</p>
            <p className='text-1xl font-body'>{currentPurchase.paymentMethod}</p>
          </div>

          <div className='flex flex-col'>
            <p className='font-bold mr-2'>Total</p>
            <p className='text-1xl font-body'>
              ${formatNumber(currentPurchase.total)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
