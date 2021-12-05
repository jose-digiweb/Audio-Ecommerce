import React from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import AboutSection from '../../reusables/AboutSection';

const Layout = ({ isLogged, setIsLogged, setShowCart, children }) => {
  const { pathname } = useLocation();
  const path = () => {
    if (pathname === '/checkout') return true;
    if (pathname === '/auth') return true;
  };

  return (
    <React.Fragment>
      <Header
        isLogged={isLogged}
        setIsLogged={setIsLogged}
        setShowCart={setShowCart}
      />

      <main className={`${path() ? 'pb-0' : 'pb-32'} tablet:pb-20 mobile:pb-28`}>
        {children}

        {path() ? null : <AboutSection />}
      </main>

      <Footer />
    </React.Fragment>
  );
};

export default Layout;
