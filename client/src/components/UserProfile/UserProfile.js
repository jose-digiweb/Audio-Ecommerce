import React, { useEffect, useState } from 'react';

import ProfileNavigation from './subSection/ProfileNavigation';
import { getUser } from '../../helper';

const UserProfile = ({ children, isLogged }) => {
  const [currentUser, setCurrentUser] = useState(isLogged.loggedUser);

  useEffect(() => {
    (async () => {
      const { loggedUser } = await getUser();

      setCurrentUser(loggedUser);
    })();
  }, [isLogged]);

  return (
    <section className='w-full h-screen flex justify-center bg-primary-light px-20'>
      <ProfileNavigation currentUser={currentUser} />

      {children}
    </section>
  );
};

export default UserProfile;
