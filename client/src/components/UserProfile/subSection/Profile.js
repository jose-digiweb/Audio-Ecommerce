import React, { useEffect, useState } from 'react';
import _ from 'lodash';

import ImageRender from '../../reusables/ImageRender';
import { getUser, View } from '../../../helper';

const Profile = ({ isLogged }) => {
  const [currentUser, setCurrentUser] = useState(isLogged?.loggedUser);
  const purchases = currentUser?.purchases?.slice(-3);
  const shippingAddress = currentUser?.address || {};
  const { profileNav } = View();

  useEffect(() => {
    (async () => {
      const { loggedUser } = await getUser();
      setCurrentUser(loggedUser);
    })();
  }, []);

  const renderLastOrders = () => {
    return purchases?.map(purchase => (
      <div key={purchase?._id} className='flex justify-between items-center'>
        <div
          className={`${
            profileNav
              ? 'flex flex-col items-start w-52 mobile:w-auto'
              : 'flex items-center w-52 mobile:w-auto'
          }`}
        >
          <ImageRender
            url={`products/${purchase?.products[0].name.split(' ').join('-')}`}
            path={purchase?.products[0].image}
            transform={{ width: '70px', radius: 10 }}
          />

          <div className={`flex pl-4`}>
            {purchase?.products?.length > 1 ? (
              <p>
                {purchase?.products[0]?.name.split(' ')[0]}
                <span className='mobile:hidden'>
                  , and ({purchase?.products?.length}) more...
                </span>
              </p>
            ) : (
              <p>{purchase?.products[0]?.name.split(' ')[0]}</p>
            )}
          </div>
        </div>

        <div className={`flex  ${profileNav ? 'flex-col' : 'mobile:w-full'}`}>
          <p className='mr-4 font-bold mobile:text-center mobile:mr-0'>Quantity:</p>
          <p className='mobile:text-center'>{purchase?.products[0]?.quantity}</p>
        </div>

        <div className={`flex  ${profileNav ? 'flex-col' : 'mobile:w-full'}`}>
          <p className='mr-4 font-bold mobile:text-center mobile:mr-0'>When:</p>
          <p className='mobile:text-center'>{purchase?.date?.split('T')[0]}</p>
        </div>

        <div className='flex tablet:hidden mobile:hidden'>
          <button className='py-2 px-4 my-2 bg-primary text-white rounded hover:bg-primary-light'>
            Buy again
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className='w-full h-full flex flex-col items-center justify-center pl-10 tablet:pl-0 tablet:h-auto  mobile:pl-0 mobile:h-auto'>
      <div className='w-full flex flex-col justify-center bg-gray px-10 py-4 my-6 rounded-md mobile:px-4'>
        <h5 className='mb-2 pb-2 border-b-2 mobile:text-center'>Last 3 orders</h5>

        {renderLastOrders()}

        <div className='w-full flex mt-4'>
          {_.isEmpty(currentUser.purchases) ? (
            <p className='rounded'>No orders to show.</p>
          ) : null}

          {isLogged.loggedUser?.purchases?.length - 3 >= 1 && (
            <p className='rounded'>
              and {isLogged.loggedUser?.purchases?.length - 3} more orders... Click
              "My orders" tab to view them all.
            </p>
          )}
        </div>
      </div>

      <div className='w-full flex flex-col justify-center bg-gray px-10 py-4 my-6 rounded-md mobile:hidden'>
        <h5 className='mb-2 pb-2 border-b-2'>Shipping address</h5>

        {_.isEmpty(shippingAddress) ? (
          <div className='flex justify-between items-center mt-2'>
            <p className='mr-4 '>
              Click on <span className='font-bold'>"Shipping Details"</span> tab to
              define your shipping address.
            </p>
          </div>
        ) : (
          <div className='flex justify-between items-center mt-2'>
            <div className='flex tablet:flex-col  mobile:flex-col'>
              <p className='mr-4 font-bold'>Street: </p>
              <p>{shippingAddress?.street}</p>
            </div>
            <div className='flex tablet:flex-col mobile:flex-col'>
              <p className='mr-4 font-bold'>Zip Code:</p>
              <p>{shippingAddress?.zipCode}</p>
            </div>
            <div className='flex tablet:flex-col mobile:flex-col'>
              <p className='mr-4 font-bold'>City:</p>
              <p>{shippingAddress?.city}</p>
            </div>

            <div className='flex tablet:flex-col mobile:flex-col'>
              <p className='mr-4 font-bold'>Country:</p>
              <p>{shippingAddress?.country}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
