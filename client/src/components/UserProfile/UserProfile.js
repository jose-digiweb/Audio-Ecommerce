import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import ForbiddenPage from '../reusables/ForbiddenPage';
import ProfileNavigation from './subSection/ProfileNavigation';
import Header from '../Header/Header';
import { getUser } from '../../helper';

const UserProfile = ({ isLogged, setIsLogged, setShowCart }) => {
  const [currentUser, setCurrentUser] = useState(isLogged.loggedUser);

  useEffect(() => {
    (async () => {
      const { loggedUser } = await getUser();

      setCurrentUser(loggedUser);
    })();
  }, [isLogged]);

  return (
    <React.Fragment>
      {isLogged !== undefined && 'jwtToken' in isLogged ? (
        <section className='w-full h-screen flex justify-center bg-primary-light px-20'>
          <Header
            isLogged={isLogged}
            setIsLogged={setIsLogged}
            setShowCart={setShowCart}
          />

          <ProfileNavigation currentUser={currentUser} />

          <Outlet />
        </section>
      ) : (
        <ForbiddenPage
          text='Only Registered Users! Please create an account or Login.'
          btnText='Back to home'
        />
      )}
    </React.Fragment>
  );
};

export default UserProfile;
