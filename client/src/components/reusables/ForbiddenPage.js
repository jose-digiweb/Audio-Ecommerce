import React from 'react';
import { useNavigate } from 'react-router-dom';

const ForbiddenPage = ({ text, btnText }) => {
  const navigate = useNavigate();

  return (
    <div className='w-full h-screen flex flex-col bg-auth-pattern bg-center  bg-cover justify-center items-center bg-primary text-white absolute z-50 top-0 left-0'>
      <h2 className='bg-primary-light px-4 py-1 mb-4 rounded'>Not Allowed</h2>
      <p className='mb-6 text-lg font-bold tracking-wider'>{text}</p>
      {btnText ? (
        <button
          onClick={() => navigate('/')}
          className='btn-secondary rounded border-0'
        >
          {btnText}
        </button>
      ) : null}
    </div>
  );
};

export default ForbiddenPage;
