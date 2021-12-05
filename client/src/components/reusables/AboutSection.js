import React from 'react';
import MediaQuery, { useMediaQuery } from 'react-responsive';

import ImageRender from './ImageRender';

const AboutSection = () => {
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
    <section className='w-full'>
      <div className='container flex justify-between tablet:flex-col tablet:items-center mobile:flex-col mobile:items-center'>
        <div className='w-1/2 max-w-2 flex flex-col justify-center tablet:w-full tablet:order-1 tablet:max-w-lg mobile:w-full mobile:order-1 mobile:text-center'>
          <MediaQuery minWidth={500}>
            <h2 className='uppercase mb-8 tablet:text-center'>
              Bringing you the <span className='text-primary'>best</span> audio gear
            </h2>
          </MediaQuery>

          <MediaQuery maxWidth={499}>
            <h3 className='uppercase mb-8 tablet:text-center'>
              Bringing you the <span className='text-primary'>best</span> audio gear
            </h3>
          </MediaQuery>

          <p className='tablet:text-center'>
            Located at the heart of New York City, Audiophile is the premier store
            for high end headphones, earphones, speakers, and audio accessories. We
            have a large showroom and luxury demonstration rooms available for you to
            browse and experience a wide range of our products. Stop by our store to
            meet some of the fantastic people who make Audiophile the best place to
            buy your portable audio equipment.
          </p>
        </div>
        <div className='w-1/2 tablet:w-full tablet:mb-16 mobile:w-full mobile:mb-12'>
          <ImageRender
            url={`shared/${imageUrl}`}
            path='men-using-product.jpg'
            transform={{ radius: 10 }}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
