import React from 'react';

import ImageRender from '../../reusables/ImageRender';

const DashboardLink = ({ text, url, path }) => {
  return (
    <div className='flex items-center py-2 pl-2'>
      <div className='shadow-md bg-primary rounded p-1'>
        <ImageRender url={url} path={path} />
      </div>

      <span className='font-bold text-white ml-2'>{text}</span>
    </div>
  );
};

export default DashboardLink;
