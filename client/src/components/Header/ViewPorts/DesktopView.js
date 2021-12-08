import React from 'react';
import { NavLink } from 'react-router-dom';
import _ from 'lodash';

import ImageRender from '../../reusables/ImageRender';
import UserDropdown from '../UserDropdown/UserDropdown';
import Nav from '../Nav/Nav';

const DesktopView = ({
  currentUser,
  showMenu,
  showUserMenu,
  setShowUserMenu,
  setShowCart,
  cartItems,
  isLogged,
  handleLogout,
}) => {
  return (
    <div className='w-full flex justify-between items-center'>
      <NavLink to='/'>
        <ImageRender url='shared/desktop' path='logo.svg' />
      </NavLink>

      <Nav showMenu={showMenu} />

      <div className={`text-white flex items-center`}>
        <div
          onClick={() => setShowCart(prev => !prev)}
          className={`mr-4 cursor-pointer relative`}
        >
          {cartItems?.length > 0 ? (
            <div className='flex items-center justify-center bg-red-500 rounded-full ml-2 py-cart-pop-y px-cart-pop-x text-white text-cart-pop absolute'>
              {cartItems?.length}
            </div>
          ) : null}

          <ImageRender url='dashboard/icons' path='cartWhite.svg' />
        </div>

        {_.isEmpty(currentUser) && (
          <NavLink to='/auth'>
            <span
              className={`text-white hover:bg-primary-light ml-4 bg-primary px-4 py-2`}
            >
              Sign In
            </span>
          </NavLink>
        )}
        {currentUser?.role === 'admin' && (
          <NavLink to='/admin/dashboard'>
            <button
              className={`py-1 px-4 ml-8 border-2 text-black bg-white rounded hover:text-white hover:bg-black`}
            >
              Dashboard
            </button>
          </NavLink>
        )}
        {currentUser?.role === 'user' && (
          <div
            onClick={() => setShowUserMenu(prev => !prev)}
            className='relative bg-primary ml-6 flex flex-col justify-center items-center rounded-full hover:bg-opacity-90 cursor-pointer'
          >
            {_.isEmpty(currentUser?.picture) ? (
              <div className='w-10 h-10 flex justify-center items-center'>
                <p className=''>
                  {`${currentUser?.name?.split(' ')[0][0]} ${
                    currentUser?.name?.split(' ')[1][0]
                  }`}
                </p>
              </div>
            ) : (
              <div className='relative w-10 h-10 flex justify-center items-center'>
                <UserDropdown
                  currentUser={currentUser}
                  handleLogout={handleLogout}
                  showUserMenu={showUserMenu}
                />
                <ImageRender
                  url='users'
                  path={`/${currentUser?.picture?.picName}`}
                  transform={{ width: 40, radius: 'max' }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DesktopView;
