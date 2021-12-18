import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import _ from 'lodash';

import { AppContext } from '../../../Contexts/AppContext';
import ImageRender from '../../reusables/ImageRender';
import UserDropdown from '../UserDropdown/UserDropdown';
import { getUser, nameShortcut } from '../../../helper';

const UserSection = () => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  const { setShowCart, isLogged } = useContext(AppContext);
  const [currentUser, setCurrentUser] = useState(isLogged);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    (async () => {
      const { loggedUser } = await getUser();

      setCurrentUser(loggedUser);
    })();
  }, [isLogged]);

  const handleUserMenuClick = () => {
    setShowUserMenu(prev => !prev);
  };

  return (
    <div className='flex items-center'>
      <div
        onClick={() => setShowCart(prev => !prev)}
        className={`mr-4 mobile:mr-0 tablet:mr-8 cursor-pointer`}
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
            className={`text-white hover:bg-primary-light ml-4 bg-primary px-4 py-2 mobile:p-0 mobile:bg-transparent`}
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
          onClick={handleUserMenuClick}
          className='relative bg-primary ml-6 flex flex-col justify-center items-center rounded-full hover:bg-opacity-90 cursor-pointer'
        >
          {_.isEmpty(currentUser?.picture) ? (
            <div className='w-10 h-10 flex justify-center items-center'>
              <p className='text-white'>{nameShortcut(currentUser?.name)}</p>
            </div>
          ) : (
            <div className='w-10 h-10 hover:border-2 hover:border-primary rounded-full flex justify-center items-center tablet:border-2 tablet:border-primary mobile:w-8 mobile:h-8 mobile:border-2 mobile:border-primary transition-all ease-in-out'>
              <ImageRender
                url='users'
                path={`/${currentUser?.picture?.picName}`}
                transform={{ width: 40, radius: 'max' }}
              />
            </div>
          )}

          <UserDropdown
            currentUser={currentUser}
            showUserMenu={showUserMenu}
            setCurrentUser={setCurrentUser}
          />
        </div>
      )}
    </div>
  );
};

export default UserSection;
