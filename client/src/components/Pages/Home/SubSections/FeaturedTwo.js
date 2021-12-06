import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../reusables/Button';

const FeaturedTwo = ({ products }) => {
  const product = products?.filter(product => product.name === 'ZX7 Speaker')[0];

  const navigate = useNavigate();

  return (
    <div className='container flex bg-featured-sec-2-desktop bg-cover bg-no-repeat rounded-lg mb-12 tablet:bg-featured-sec-2-tablet mobile:bg-featured-sec-2-mobile mobile:bg-right mobile:mb-8'>
      <div className='w-1/2 flex flex-col py-24 pl-20 justify-center tablet:pl-16 mobile:pl-6 mobile:w-full'>
        <h3 className='text-black mb-6 uppercase mobile:mb-10'>{product?.name}</h3>

        <Button
          handleClick={() => navigate(`product/${product?.slug}`)}
          type='button'
          text='see product'
          styles='btn-secondary bg-transparent hover:bg-black hover:text-white mobile:px-6'
        />
      </div>
    </div>
  );
};

export default FeaturedTwo;
