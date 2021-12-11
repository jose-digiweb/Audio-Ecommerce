import React, { useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';

import { AppContext } from '../../Contexts/AppContext';

const RenderMessage = () => {
  const { showMessage } = useContext(AppContext);
  const { show, payload } = showMessage;

  useEffect(() => {}, [showMessage]);

  return createPortal(
    <div
      className={`w-full absolute flex justify-center top-0 z-50 ${
        show ? '' : 'hidden'
      }`}
    >
      <div
        className={`w-1/2 rounded-b-md text-center bg-${payload.color}-600 px-8 py-4 shadow-md`}
      >
        <h6 className='text-white'>{payload.text}</h6>
      </div>
    </div>,
    document.getElementById('root')
  );
};

export default RenderMessage;
