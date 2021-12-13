import React, { useEffect, useState, useContext } from 'react';
import _ from 'lodash';

import { AppContext } from '../../../Contexts/AppContext';
import RenderOrders from '../Reusable/RenderOrders';
import { getUser } from '../../../helper';

const Profile = () => {
  const { isLogged } = useContext(AppContext);
  const [currentUser, setCurrentUser] = useState(isLogged?.loggedUser);
  const purchases = currentUser?.purchases?.slice(-3);
  const shippingAddress = currentUser?.address || {};

  useEffect(() => {
    (async () => {
      const { loggedUser } = await getUser();
      setCurrentUser(loggedUser);
    })();
  }, []);

  return (
    <div
      className={`w-full h-screen flex flex-col items-center justify-center pt-24 pl-10 tablet:pl-0 tablet:h-auto mobile:justify-start mobile:pt-0 mobile:pl-0 mobile:screen`}
    >
      <div className='w-full flex flex-col justify-center bg-gray px-10 py-4 my-6 rounded-md mobile:px-4'>
        <p className='mb-2 pb-2 border-b-2 font-bold text-2xl mobile:text-lg mobile:text-center'>
          Last 3 orders
        </p>

        <RenderOrders purchases={purchases} />

        <div className='w-full flex mt-4'>
          {_.isEmpty(currentUser.purchases) ? (
            <p className='w-full font-body mobile:text-center'>
              No orders to show yet...
            </p>
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
