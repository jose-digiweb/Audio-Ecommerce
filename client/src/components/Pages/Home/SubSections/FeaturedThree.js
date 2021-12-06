import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import ImageRender from '../../../reusables/ImageRender';
import Button from '../../../reusables/Button';

const FeaturedThree = ({ products }) => {
  const product = products?.filter(product => product.name === 'YX1 Earphones')[0];

  const navigate = useNavigate();

  const desktopViewport = useMediaQuery({ minWidth: 1280 });
  const tabletViewport = useMediaQuery({ minWidth: 501, maxWidth: 1279 });
  const smallViewport = useMediaQuery({ maxWidth: 500 });

  let imageUrl;
  if (tabletViewport) {
    imageUrl = 'tablet';
  }
  if (desktopViewport) {
    imageUrl = 'desktop';
  }
  if (smallViewport) {
    imageUrl = 'mobile';
  }

  return (
    <div className='container flex mobile:flex-col'>
      <div className='w-1/2 mr-6 mobile:w-full'>
        <ImageRender
          url={`home/${imageUrl}`}
          path='image-earphones.jpg'
          transform={{ radius: 10 }}
        />
      </div>

      <div className='w-1/2 bg-gray flex flex-col py-24 pl-20 justify-center rounded-lg tablet:py-10 tablet:pl-10 mobile:w-full mobile:py-12 mobile:pl-8 mobile:mt-6'>
        <h4 className='text-black mb-6 uppercase mobile:mb-8'>{`${
          product?.name.split(' ')[0]
        } ${product?.category}`}</h4>

        <Button
          handleClick={() => navigate(`product/${product?.slug}`)}
          type='button'
          text='see product'
          styles='btn-secondary bg-transparent hover:bg-black hover:text-white'
        />
      </div>
    </div>
  );
};

export default FeaturedThree;
