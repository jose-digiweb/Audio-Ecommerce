import React from 'react';
import { NavLink } from 'react-router-dom';

const ProfileNavigation = ({ currentUser }) => {
  return (
    <div className='w-1/3 h-full flex flex-col justify-center'>
      <div className='text-white mb-10'>
        <h6>Hey {currentUser?.name?.split(' ')[0]},</h6>
        <h4>Welcome Back</h4>
      </div>

      <div className='w-full flex flex-col justify-center items-center'>
        <NavLink
          to={`/me/${currentUser?.id}`}
          activeClassName='bg-primary text-green-100'
          className={`w-full flex justify-center items-center py-4 my-4 transition-all ease-in-out bg-gray text-gray-dark rounded-md cursor-pointer shadow-lg hover:bg-primary hover:text-white`}
        >
          <h6>Profile</h6>
        </NavLink>
        <NavLink
          to={`/my-orders/${currentUser?.id}`}
          activeClassName='bg-primary text-green-100'
          className='w-full flex justify-center items-center py-4 my-4 transition-all ease-in-out bg-gray text-gray-dark rounded-md cursor-pointer shadow-lg hover:bg-primary hover:text-white'
        >
          <h6>My orders</h6>
        </NavLink>

        <NavLink
          to={`/shipping-details/${currentUser?.id}`}
          activeClassName='bg-primary text-green-100'
          className='w-full flex justify-center items-center py-4 my-4 transition-all ease-in-out bg-gray text-gray-dark rounded-md cursor-pointer shadow-lg hover:bg-primary hover:text-white'
        >
          <h6>Shipping Details</h6>
        </NavLink>

        <NavLink
          to={`/profile-settings/${currentUser?.id}`}
          activeClassName='bg-primary text-green-100'
          className='w-full flex justify-center items-center py-4 my-4 transition-all ease-in-out bg-gray text-gray-dark rounded-md cursor-pointer shadow-lg hover:bg-primary hover:text-white'
        >
          <h6>Profile settings</h6>
        </NavLink>
      </div>
    </div>
  );
};

export default ProfileNavigation;
