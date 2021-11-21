import React from 'react';
import ReactDOM from 'react-dom';

const ShowMessage = ({ message, color }) => {
  return ReactDOM.createPortal(
    <div className='w-full absolute flex justify-center top-0 z-10'>
      <div
        className={`w-1/2 rounded-b-md text-center bg-${color}-600 px-8 py-4 shadow-md`}
      >
        <h6 className='text-white'>{message}</h6>
      </div>
    </div>,
    document.getElementById('root')
  );
};

export default ShowMessage;
