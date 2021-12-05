import React from 'react';
import { Navigate } from 'react-router-dom';

const DesktopViewWarning = () => {
  return (
    <div className='w-full h-screen flex flex-col bg-auth-pattern bg-center  bg-cover justify-center items-center bg-primary text-white'>
      <h1 className='bg-primary-light xs:text-h5 xxs:text-h5 md:text-h1 px-4 py-1 mb-4 rounded uppercase'>
        Only Desktop
      </h1>
      <p className='mb-6'>Dashboard is only available in desktop!</p>
      <button
        onClick={() => Navigate('/')}
        className='btn-secondary rounded border-0'
      >
        Back to Home
      </button>
    </div>
  );
};

export default DesktopViewWarning;
