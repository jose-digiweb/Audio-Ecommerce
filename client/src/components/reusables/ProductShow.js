import React from 'react';
import { NavLink } from 'react-router-dom';
import MediaQuery, { useMediaQuery } from 'react-responsive';

import ImageRender from './ImageRender';
import Button from './Button';

const ProductShow = ({ order, goTo, title, category, description, url, path }) => {
  const desktopViewport = useMediaQuery({ minWidth: 1280 });

  let transformImage;
  if (desktopViewport) {
    transformImage = { width: '540px', radius: 10 };
  }

  return (
    <div className='flex justify-between mt-28 mb-10 tablet:flex-col tablet:mb-10 mobile:flex-col mobile:my-16'>
      <div
        className={`${
          order && desktopViewport
            ? order
            : 'w-1/2 mr-32 tablet:w-full tablet:mb-12 mobile:w-full mobile:mb-10'
        }`}
      >
        <ImageRender url={url} path={path} transform={transformImage} />
      </div>
      <div className='w-1/2 flex flex-col justify-center tablet:w-full tablet:items-center tablet:text-center mobile:w-full mobile:items-center mobile:text-center'>
        <MediaQuery minWidth={500}>
          <h1 className='mb-6 uppercase tablet:max-w-sm tablet:text-center'>
            {title[0]}
            <br />
            {category}
          </h1>
        </MediaQuery>

        <MediaQuery maxWidth={499}>
          <span className='mb-8 uppercase text-mobile-header font-bold'>
            {title[0]}
            <br />
            {category}
          </span>
        </MediaQuery>

        <p className='mb-10 max-w-2 tablet:max-w-2xl tablet:px-10 mobile:px-0'>
          {description}
        </p>

        <NavLink to={goTo}>
          <Button type='button' text='see product' styles='btn-primary ' />
        </NavLink>
      </div>
    </div>
  );
};

export default ProductShow;
