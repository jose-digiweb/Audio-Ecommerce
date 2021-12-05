import React from 'react';
import { NavLink } from 'react-router-dom';

import ImageRender from './ImageRender';
import Button from './Button';

const imageNavStyle = { width: '120px', height: '120px' };

const MobileNavLink = ({ url, path, text, href, styles, setShowMenu }) => {
  return (
    <div
      className={`flex flex-col w-full items-center py-14 mx-1 rounded-md mobile:py-2 mobile:mx-0 ${styles}`}
    >
      <div className={`-mb-20 z-10`}>
        <ImageRender url={url} path={path} transform={imageNavStyle} />
      </div>
      <NavLink
        className={`bg-gray pb-4 pt-14 w-full flex flex-col items-center hover:text-primary rounded-md`}
        to={href}
        onClick={() => setShowMenu(false)}
      >
        <p className='mt-6 mb-2 uppercase text-navLink font-bold'>{text}</p>

        <Button styles='btn-shop' type='button' text='shop'>
          <ImageRender url='shared/desktop' path='arrow.svg' />
        </Button>
      </NavLink>
    </div>
  );
};

export default MobileNavLink;
