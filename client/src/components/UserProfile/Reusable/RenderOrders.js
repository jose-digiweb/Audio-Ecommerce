import React from 'react';

import ImageRender from '../../reusables/ImageRender';
import { View } from '../../../helper';

const RenderOrders = ({ purchases }) => {
  const { profileNav } = View();

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
              {purchase?.products[0]?.name.split(' ')[0]},
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

export default RenderOrders;
