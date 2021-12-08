import React from 'react';

import { NavLink } from 'react-router-dom';
import ImageRender from '../../reusables/ImageRender';

const UserDropdown = ({ currentUser, handleLogout, showUserMenu }) => {
  return (
    <div
      className={`${
        showUserMenu ? '' : 'hidden'
      } absolute text-black bg-gray top-10 right-8 px-6 py-4 w-56 shadow-lg rounded`}
    >
      <NavLink
        to={`/users/me/${currentUser?.id}`}
        className='flex pt-2 pb-4 font-bold text-gray-500 hover:text-primary'
      >
        <ImageRender url='shared/desktop' path='profile.svg' />
        <p className='ml-2'>Profile</p>
      </NavLink>

      <NavLink
        to={`/users/my-orders/${currentUser?.id}`}
        className='flex pt-2 pb-4 font-bold text-gray-500 hover:text-primary'
      >
        <ImageRender url='shared/desktop' path='shopBag.svg' />
        <p className='ml-2'>My orders</p>
      </NavLink>

      <NavLink
        to={`/users/profile-settings/${currentUser?.id}`}
        className='flex pt-2 pb-4 font-bold text-gray-500 hover:text-primary'
      >
        <ImageRender url='shared/desktop' path='setting.svg' />
        <p className='ml-2'>Profile settings</p>
      </NavLink>

      <div
        onClick={handleLogout}
        className='flex pb-2 pt-4 font-bold text-gray-500 hover:text-red-500 border-t-2'
      >
        <ImageRender url='shared/desktop' path='signOut.svg' />
        <p className='ml-2'>Log out</p>
      </div>
    </div>
  );
};

export default UserDropdown;
