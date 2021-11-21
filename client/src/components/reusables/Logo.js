import React from 'react';

import ImageRender from '../reusables/ImageRender';

const Logo = ({ onClick, styles }) => {
  return (
    <div onClick={onClick} className={`text-white cursor-pointer ${styles}`}>
      <ImageRender url='shared/desktop' path='logo.svg' />
    </div>
  );
};

export default Logo;
