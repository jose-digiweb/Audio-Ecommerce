import React from 'react';
import { useMediaQuery } from 'react-responsive';

import ImageRender from '../../../reusables/ImageRender';

const GallerySection = ({ product }) => {
  const desktopViewport = useMediaQuery({ minWidth: 1280 });
  const tabletViewport = useMediaQuery({ minWidth: 501, maxWidth: 1279 });
  const smallViewport = useMediaQuery({ maxWidth: 500 });

  let imageTransform;
  if (desktopViewport) {
    imageTransform = { radius: 5 };
  }
  if (tabletViewport) {
    imageTransform = {
      radius: 5,
    };
  }
  if (smallViewport) {
    imageTransform = {
      radius: 20,
    };
  }

  if (!product) return null;

  const smallImages = product?.images.filter(image => !image.bigger);
  const biggerImage = product?.images.filter(image => image.bigger);

  return (
    <section className='w-full mb-36 mobile:mb-26'>
      <div className='container'>
        <div className='flex mobile:flex-col mobile:w-full'>
          <div className='flex flex-col justify-between mr-6 mobile:w-full mobile:mr-0'>
            <div className='w-auto mobile:mb-6'>
              <ImageRender
                url={`products/${product?.name.split(' ').join('-')}`}
                path={`${smallImages[0]?.imageName}`}
                transform={imageTransform}
              />
            </div>
            <div className='w-auto mobile:mb-6'>
              <ImageRender
                url={`products/${product?.name.split(' ').join('-')}`}
                path={`${smallImages[1]?.imageName}`}
                transform={imageTransform}
              />
            </div>
          </div>
          <div className='w-auto'>
            <ImageRender
              url={`products/${product?.name.split(' ').join('-')}`}
              path={`${biggerImage[0]?.imageName}`}
              transform={imageTransform}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
