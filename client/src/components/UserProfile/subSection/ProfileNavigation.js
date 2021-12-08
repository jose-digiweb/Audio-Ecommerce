import React from 'react';
import { NavLink } from 'react-router-dom';

import { activeProfileLink, View } from '../../../helper';

const ProfileNavigation = ({ currentUser }) => {
  const { profileNav } = View();

  return (
    <div className='w-1/3 h-full flex flex-col justify-center tablet:w-full tablet:h-auto tablet:mb-10 tablet:mt-10 mobile:w-full mobile:h-auto mobile:mb-10 mobile:mt-10'>
      <div className='text-white mb-10 mobile:mb-6'>
        <h6>Hey {currentUser?.name?.split(' ')[0]},</h6>
        <h4>Welcome Back</h4>
      </div>

      <div
        className={`w-full flex flex-col justify-center items-center tablet:flex-row ${
          profileNav ? 'tablet:flex-col' : ''
        }`}
      >
        <div className='w-full flex flex-col tablet:mr-4 mobile:mr-0'>
          <NavLink
            to={`me/${currentUser?.id}`}
            style={activeProfileLink}
            className={`w-full flex justify-center items-center py-4 my-4  transition-all ease-in-out bg-gray text-gray-dark rounded-md cursor-pointer shadow-lg hover:bg-primary hover:text-white tablet:mx-2 mobile:my-2`}
          >
            <span className='font-bold'>Profile</span>
          </NavLink>

          <NavLink
            to={`my-orders/${currentUser?.id}`}
            style={activeProfileLink}
            className='w-full flex justify-center items-center py-4 my-4 transition-all ease-in-out bg-gray text-gray-dark rounded-md cursor-pointer shadow-lg hover:bg-primary hover:text-white tablet:mx-2 mobile:my-2'
          >
            <span className='font-bold'>My orders</span>
          </NavLink>
        </div>

        <div className='w-full flex flex-col'>
          <NavLink
            to={`shipping-details/${currentUser?.id}`}
            style={activeProfileLink}
            className='w-full flex justify-center items-center py-4 my-4 transition-all ease-in-out bg-gray text-gray-dark rounded-md cursor-pointer shadow-lg hover:bg-primary hover:text-white tablet:mx-2 mobile:my-2'
          >
            <span className='font-bold'>Shipping Details</span>
          </NavLink>

          <NavLink
            to={`profile-settings/${currentUser?.id}`}
            style={activeProfileLink}
            className='w-full flex justify-center items-center py-4 my-4 transition-all ease-in-out bg-gray text-gray-dark rounded-md cursor-pointer shadow-lg hover:bg-primary hover:text-white tablet:mx-2 mobile:my-2'
          >
            <span className='font-bold'>Profile settings</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ProfileNavigation;
