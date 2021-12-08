import React, { useEffect, useState } from 'react';

import ImageRender from '../../reusables/ImageRender';
import { getUser, View } from '../../../helper';

const MyOrders = ({ isLogged }) => {
  const [purchases, setPurchases] = useState(isLogged?.loggedUser?.purchases);
  const { profileNav } = View();

  useEffect(() => {
    (async () => {
      const { loggedUser } = await getUser();

      setPurchases(loggedUser.purchases);
    })();
  }, []);

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center pl-10 tablet:h-auto tablet:pl-0 tablet:justify-start  mobile:justify-start mobile:pl-0 mobile:h-screen'>
      <div className='w-full'>
        <h5 className='text-white mb-2 pb-2 border-b-2'>My orders</h5>
      </div>

      <div
        className={`w-full h-1/2 flex flex-col  bg-gray px-10 py-4 my-6 rounded-md overflow-y-scroll scrollbar-thin scrollbar-thumb-primary mobile:px-4 mobile:h-4/5  ${
          profileNav ? 'tablet:h-3/5' : 'tablet:h-4/5'
        }`}
      >
        {purchases.map(purchase => (
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

              <div className='w-full flex'>
                {purchase?.products?.length > 1 ? (
                  <p className='w-full mobile:text-center'>
                    {purchase?.products[0]?.name.split(' ')[0]}
                    <span className='mobile:hidden'>
                      , and ({purchase?.products?.length}) more...
                    </span>
                  </p>
                ) : (
                  <p className='w-full mobile:text-center'>
                    {purchase?.products[0]?.name.split(' ')[0]}
                  </p>
                )}
              </div>
            </div>

            <div className={`flex ${profileNav ? 'flex-col' : 'mobile:w-full'}`}>
              <p className='mr-4 font-bold mobile:text-center mobile:mr-0'>
                Quantity:
              </p>
              <p className='mobile:text-center'>{purchase?.products[0]?.quantity}</p>
            </div>
            <div className={`flex ${profileNav ? 'flex-col' : 'mobile:w-full'}`}>
              <p className='mr-4 font-bold mobile:text-center mobile:mr-0'>When:</p>
              <p className='mobile:text-center'>{purchase?.date?.split('T')[0]}</p>
            </div>
            <div className='flex tablet:hidden mobile:hidden'>
              <button className='py-2 px-4 my-2 bg-primary text-white rounded hover:bg-primary-light'>
                Buy again
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
