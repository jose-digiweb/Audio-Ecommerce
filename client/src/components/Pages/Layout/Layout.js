import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import AboutSection from '../../reusables/AboutSection';

const Layout = ({ isLogged, setIsLogged, setShowCart }) => {
  const { pathname } = useLocation();
  const isCheckout = () => pathname === '/checkout';

  return (
    <React.Fragment>
      <Header
        isLogged={isLogged}
        setIsLogged={setIsLogged}
        setShowCart={setShowCart}
      />

      <main className={`${isCheckout() ? '' : 'pb-32'} tablet:pb-20 mobile:pb-28`}>
        <Outlet />
        {isCheckout() ? null : <AboutSection />}
      </main>

      <Footer />
    </React.Fragment>
  );
};

export default Layout;
