import React, { useEffect, useState, useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { AppContext } from '../../Contexts/AppContext';
import ForbiddenPage from '../reusables/ForbiddenPage';
import ProfileNavigation from './subSection/ProfileNavigation';
import Header from '../Header/Header';
import { getUser } from '../../helper';

const UserProfile = () => {
  const { isLogged, setIsLogged, setShowCart } = useContext(AppContext);
  const [currentUser, setCurrentUser] = useState(isLogged.loggedUser);
  const { pathname } = useLocation();

  useEffect(() => {
    (async () => {
      const { loggedUser } = await getUser();

      setCurrentUser(loggedUser);
    })();
  }, [isLogged]);

  return (
    <React.Fragment>
      <Header
        isLogged={isLogged}
        setIsLogged={setIsLogged}
        setShowCart={setShowCart}
      />

      {isLogged !== undefined && 'jwtToken' in isLogged ? (
        <section
          className={`w-full h-screen flex justify-center bg-primary-light px-20 tablet:flex-col tablet:items-center tablet:justify-start tablet:px-10 tablet:pt-24 ${
            pathname.includes('my-orders') ? 'tablet:h-full' : 'tablet:h-screen'
          } mobile:flex-col mobile:items-center mobile:justify-start mobile:px-4 mobile:pt-20 mobile:h-full`}
        >
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
