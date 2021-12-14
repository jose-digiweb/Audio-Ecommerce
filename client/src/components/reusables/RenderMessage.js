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
        className={`w-auto rounded-b-md text-center ${payload.color} px-8 py-4 tracking-wider shadow-md mobile:w-auto mobile:px-2 mobile:py-2`}
      >
        <p className='font-body text-2xl text-white mobile:text-lg mobile:tracking-wide'>
          {payload.text}
        </p>
      </div>
    </div>,
    document.getElementById('root')
  );
};

export default RenderMessage;
