import React from 'react';
import { useNavigate } from 'react-router-dom';
import MediaQuery, { useMediaQuery } from 'react-responsive';

import ImageRender from '../../../reusables/ImageRender';
import Button from '../../../reusables/Button';

const FeaturedOne = ({ products }) => {
  const product = products?.filter(product => product.name === 'ZX9 Speaker')[0];

  const navigate = useNavigate();

  const desktopViewport = useMediaQuery({ minWidth: 1280 });
  const tabletViewport = useMediaQuery({ minWidth: 501, maxWidth: 1279 });
  const smallViewport = useMediaQuery({ maxWidth: 500 });

  let transformImage;
  let imageUrl;
  if (desktopViewport) {
    transformImage = { width: 380 };
    imageUrl = 'desktop';
  }
  if (tabletViewport) {
    transformImage = { width: 180 };
    imageUrl = 'tablet';
  }
  if (smallViewport) {
    transformImage = { width: 160 };
    imageUrl = 'mobile';
  }

  return (
    <div className='container pl-32 mb-12 flex bg-primary bg-pattern-circle bg-16 bg-no-repeat bg-left-top-1 rounded-lg overflow-hidden tablet:flex-col tablet:pl-0 tablet:items-center tablet:pb-16 tablet:bg-bottom-4 mobile:flex-col mobile:pl-0 mobile:items-center mobile:bg-topMobilePattern mobile:bg-mobilePatternSize mobile:pb-16'>
      <div className='w-1/2 mr-16 pt-24 transform translate-y-4 tablet:w-full tablet:flex tablet:justify-center tablet:pt-10 tablet:mb-24 tablet:mr-0 mobile:w-full mobile:flex mobile:justify-center mobile:pt-12 mobile:mb-16 mobile:mr-0'>
        <ImageRender
          url={`home/${imageUrl}`}
          path='image-speaker-zx9.png'
          transform={transformImage}
        />
      </div>
      <div className='w-1/2 flex flex-col justify-center tablet:w-full tablet:items-center tablet:text-center mobile:w-full mobile:items-center mobile:text-center'>
        <MediaQuery minWidth={500}>
          <h1 className='text-white mb-6 uppercase '>
            {product?.name.split(' ')[0]}
            <br /> {product?.name.split(' ')[1]}
          </h1>
        </MediaQuery>
        <MediaQuery maxWidth={499}>
          <span className='text-white mb-8 uppercase text-mobile-header font-bold'>
            {product?.name.split(' ')[0]}
            <br /> {product?.name.split(' ')[1]}
          </span>
        </MediaQuery>
        <p className='text-white mb-10 max-w-sm '>
          Upgrade to premium speakers that are phenomenally built to deliver truly
          remarkable sound.
        </p>

        <Button
          handleClick={() => navigate(`product/${product?.slug}`)}
          type='button'
          text='see product'
          styles='btn-secondary border-0 bg-black text-white hover:bg-gray-dark'
        />
      </div>
    </div>
  );
};

export default FeaturedOne;
