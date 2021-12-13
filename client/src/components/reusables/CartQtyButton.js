import React, { useContext } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

import ImageRender from '../reusables/ImageRender';
import { AppContext } from '../../Contexts/AppContext';

const CartQtyButton = ({ cartQuantity, handleUpdateBtn, product }) => {
  const { showCart } = useContext(AppContext);

  return (
    <div className='flex bg-gray items-center'>
      <div className='h-full flex item-center'>
        <button
          type='button'
          onClick={() => handleUpdateBtn('minus', product)}
          className={`w-full text-xxs px-4 ${
            cartQuantity < 2 ? 'py-2' : 'py-4'
          } flex items-center text-gray-400 hover:text-primary hover:cursor-pointer select-none`}
        >
          {showCart && cartQuantity < 2 ? (
            <ImageRender url='shared/desktop' path='/delete.svg' />
          ) : (
            <FaMinus />
          )}
        </button>
      </div>

      <span className='w-6 font-bold text-md flex justify-center items-center text-black select-none mobile:text-sm'>
        {cartQuantity || 1}
      </span>

      <div className='h-full flex item-center'>
        <button
          type='button'
          onClick={() => handleUpdateBtn('plus', product)}
          className='w-full text-xxs px-4 py-4 flex items-center text-gray-400 hover:text-primary hover:cursor-pointer select-none'
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default CartQtyButton;
