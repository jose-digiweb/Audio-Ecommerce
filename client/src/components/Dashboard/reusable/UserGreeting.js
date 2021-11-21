import React from 'react';

import ImageRender from '../../reusables/ImageRender';

const UserGreeting = ({ user }) => {
  const picName = user?.loggedUser?.picture[0]?.picName;
  const userName = user?.loggedUser?.name.split(' ')[0];

  const userPicStyle = { width: 40, radius: 'max' };
  return (
    <div className='w-full absolute border-2 border-primary top-0 left-0 py-4 px-4 flex items-center justify-between bg-primary-light'>
      <span className='mr-4 text-white font-bold'>Welcome back, {userName}</span>

      <div className=' bg-primary rounded-full shadow-md overflow-hidden'>
        {!picName ? (
          <ImageRender url='dashboard/icons' path='avatarWhite.svg' />
        ) : (
          <ImageRender url='users' path={`/${picName}`} transform={userPicStyle} />
        )}
      </div>
    </div>
  );
};

export default UserGreeting;
