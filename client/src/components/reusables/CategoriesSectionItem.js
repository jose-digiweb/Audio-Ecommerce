import React from 'react';
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import ImageRender from './ImageRender';
import Button from './Button';

const CategoriesSectionItem = ({ url, path, text, goTo, styles }) => {
  const desktopViewport = useMediaQuery({ minWidth: 1280 });

  const tabletViewport = useMediaQuery({ minWidth: 501, maxWidth: 1279 });

  const smallViewport = useMediaQuery({ maxWidth: 500 });

  let imageNavStyle;

  if (tabletViewport) {
    imageNavStyle = { width: '160px', height: '160px' };
  }
  if (desktopViewport) {
    imageNavStyle = { width: '200px', height: '200px' };
  }

  if (smallViewport) {
    imageNavStyle = { width: '160px', height: '160px' };
  }

  return (
    <div
      className={`flex flex-col w-full items-center py-14 mobile:py-2 mx-1 mobile:mx-0 rounded-md ${styles}`}
    >
      <div className={`-mb-32 tablet:-mb-24 mobile:-mb-24 z-10`}>
        <ImageRender url={url} path={path} transform={imageNavStyle} />
      </div>

      <div
        className={`bg-gray pb-4 pt-24 tablet:pt-16 mobile:pt-16 w-full flex flex-col items-center rounded-md`}
      >
        <h6 className='mt-6 mb-4 uppercase font-bold'>{text}</h6>

        <NavLink to={goTo}>
          <Button styles='btn-shop mb-4 tablet:mb-2' type='button' text='shop'>
            <ImageRender url='shared/desktop' path='arrowRight.svg' />
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

export default CategoriesSectionItem;
