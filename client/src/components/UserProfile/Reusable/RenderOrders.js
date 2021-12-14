import React, { useState } from 'react';

import OrderDetails from '../Reusable/OrderDetails';
import ImageRender from '../../reusables/ImageRender';
import { View } from '../../../helper';

const RenderOrders = ({ purchases }) => {
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [currentPurchase, setCurrentPurchase] = useState({});
  const { profileNav } = View();

  const handleBuyAgain = purchase => {
    setCurrentPurchase(purchase);
    setShowOrderDetails(true);
  };

  return (
    <>
      {showOrderDetails && (
        <OrderDetails
          setShowOrderDetails={setShowOrderDetails}
          currentPurchase={currentPurchase}
        />
      )}

      {purchases?.map(purchase => (
        <div
          key={purchase?._id}
          className='flex justify-between items-center border-b-2 pb-4 pt-2'
        >
          <div
            className={`${
              profileNav
                ? 'flex flex-col items-start w-52 mobile:w-auto'
                : 'flex items-center w-52 mobile:w-auto'
            } mobile:items-center`}
          >
            <ImageRender
              url={`products/${purchase?.products[0].name.split(' ').join('-')}`}
              path={purchase?.products[0].image}
              transform={{ width: '70px', radius: 10 }}
            />

            <div className={`flex pl-4 mobile:pl-0`}>
              {purchase?.products?.length > 1 ? (
                <p>
                  {purchase?.products[0]?.name.split(' ')[0]}
                  <br />
                  <span className='mobile:hidden'>
                    and ({purchase?.products?.length}) more...
                  </span>
                </p>
              ) : (
                <p>{purchase?.products[0]?.name.split(' ')[0]}</p>
              )}
            </div>
          </div>

          <div className={`flex  ${profileNav ? 'flex-col' : 'mobile:w-full'}`}>
            <p className='mr-4 font-bold mobile:text-center mobile:mr-0 mobile:pt-10 mobile:pb-2'>
              Quantity:
            </p>
            <p className='mobile:text-center'>{purchase?.products[0]?.quantity}</p>
          </div>

          <div className={`flex  ${profileNav ? 'flex-col' : 'mobile:w-full'}`}>
            <p className='mr-4 font-bold mobile:text-center mobile:mr-0 mobile:pt-10 mobile:pb-2'>
              When:
            </p>
            <p className='mobile:text-center'>{purchase?.date?.split('T')[0]}</p>
          </div>

          <div className='flex tablet:hidden mobile:hidden'>
            <div
              onClick={() => handleBuyAgain(purchase)}
              className='flex items-center py-2 px-4 my-2 font-body text-gray-600 rounded  hover:text-primary cursor-pointer'
            >
              <p className='mr-2'>Details</p>
              <div>
                <ImageRender url='shared/desktop' path='arrowRight.svg' />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default RenderOrders;
