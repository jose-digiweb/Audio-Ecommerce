import React, { useEffect, useState } from 'react';

import ImageRender from '../../reusables/ImageRender';
import { getUser } from '../../../helper';

const MyOrders = ({ isLogged }) => {
  const [purchases, setPurchases] = useState(isLogged?.loggedUser?.purchases);

  useEffect(() => {
    (async () => {
      const { loggedUser } = await getUser();

      setPurchases(loggedUser.purchases);
    })();
  }, []);

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center pl-10'>
      <div className='w-full'>
        <h5 className='text-white mb-2 pb-2 border-b-2'>My orders</h5>
      </div>

      <div className='w-full h-1/2 flex flex-col  bg-gray px-10 py-4 my-6 rounded-md overflow-y-scroll scrollbar-thin scrollbar-thumb-primary'>
        {purchases.map(purchase => (
          <div key={purchase?._id} className='flex justify-between items-center'>
            <div className='flex items-center w-64'>
              <ImageRender
                url={`products/${purchase?.products[0].name.split(' ').join('-')}`}
                path={purchase?.products[0].image}
                transform={{ width: '70px', radius: 10 }}
              />

              <div className='flex  flex-col'>
                {purchase?.products?.length > 1 ? (
                  <p>
                    {purchase?.products[0]?.name.split(' ')[0]}, and (
                    {purchase?.products?.length}) more...
                  </p>
                ) : (
                  <p>{purchase?.products[0]?.name.split(' ')[0]}</p>
                )}
              </div>
            </div>
            <div className='flex'>
              <p className='mr-4 font-bold'>Quantity:</p>
              <p>{purchase?.products[0]?.quantity}</p>
            </div>
            <div className='flex'>
              <p className='mr-4 font-bold'>When:</p>
              <p>{purchase?.date?.split('T')[0]}</p>
            </div>
            <div className='flex'>
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
