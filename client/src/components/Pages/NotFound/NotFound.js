import React from 'react';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
  const history = useHistory();

  return (
    <div className='absolute inset-0 h-screen bg-pattern-circle bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center bg-primary'>
      <div className='flex mobile:flex-col justify-center items-center'>
        <h1 className='text-white'>404</h1>
        <div className='w-0.5 h-36 mx-4 bg-white rounded mobile:transform mobile:rotate-90 mobile:mx-0 mobile:h-10 mobile:w-0.5'></div>
        <div className='mobile:text-center'>
          <p className='text-white text-xl font-bold tracking-wider'>
            Page Not Found!
          </p>
          <p className='text-white text-lg tracking-widest mb-6'>
            Please check if the url:{' '}
            <span className='font-bold underline'>
              {' '}
              {`${history.location.pathname}`}
            </span>
            , is correct.
          </p>

          <div>
            <button
              onClick={() => history.push('/')}
              type='button'
              className='py-2 px-6 text-gray-dark border-2 font-bold bg-primary-light hover:bg-primary hover:text-white rounded-md shadow-md'
            >
              Back to Homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
