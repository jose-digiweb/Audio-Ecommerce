import React from 'react';
import { NavLink } from 'react-router-dom';

import ImageRender from '../../reusables/ImageRender';
import Nav from '../Nav/Nav';

const MobileView = ({
  setShowMenu,
  setShowCart,
  cartItems,
  isLogged,
  handleLogout,
  showMenu,
}) => {
  return (
    <div className={`w-full flex justify-between`}>
      <div onClick={() => setShowMenu(prev => !prev)}>
        <ImageRender url='dashboard/icons' path='menuMobile.svg' />
      </div>

      <NavLink to='/'>
        <ImageRender url='shared/desktop' path='logo.svg' />
      </NavLink>

      <Nav showMenu={showMenu} setShowMenu={setShowMenu} />

      <div onClick={() => setShowCart(prev => !prev)}>
        {cartItems.length > 0 ? (
          <div className='flex items-center justify-center bg-red-500 rounded-full ml-2 py-cart-pop-y px-cart-pop-x text-white text-cart-pop absolute'>
            {cartItems.length}
          </div>
        ) : null}
        <ImageRender url='dashboard/icons' path='cartWhite.svg' />
      </div>
    </div>
  );
};

export default MobileView;
