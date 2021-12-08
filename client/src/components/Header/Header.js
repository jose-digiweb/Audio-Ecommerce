import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import TabletView from './ViewPorts/TabletView';
import DesktopView from './ViewPorts/DesktopView';
import MobileView from './ViewPorts/MobileView';

import { logOutAction } from '../../Redux/actions/authAction';
import { headerStyle, getUser, View } from '../../helper';

const Header = ({ logOutAction, setShowCart, cart, isLogged, setIsLogged }) => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  const { desktop, tablet, mobile } = View();
  const [currentUser, setCurrentUser] = useState(isLogged);
  const [showMenu, setShowMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { loggedUser } = await getUser();

      setCurrentUser(loggedUser);
    })();
  }, [location, isLogged, cart]);

  const handleLogout = () => {
    logOutAction(navigate, setIsLogged, setCurrentUser);
  };

  return (
    <header className={headerStyle()}>
      <div
        className={`container flex justify-between items-center py-8 border-b-2 border-opacity-10 mobile:border-b-0`}
      >
        {desktop && (
          <DesktopView
            currentUser={currentUser}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            showUserMenu={showUserMenu}
            setShowUserMenu={setShowUserMenu}
            setShowCart={setShowCart}
            cartItems={cartItems}
            isLogged={isLogged}
            handleLogout={handleLogout}
          />
        )}

        {tablet && (
          <TabletView
            currentUser={currentUser}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            setShowCart={setShowCart}
            cartItems={cartItems}
            isLogged={isLogged}
            handleLogout={handleLogout}
            showUserMenu={showUserMenu}
            setShowUserMenu={setShowUserMenu}
          />
        )}

        {mobile && (
          <MobileView
            setShowMenu={setShowMenu}
            setShowCart={setShowCart}
            cartItems={cartItems}
            isLogged={isLogged}
            handleLogout={handleLogout}
            showMenu={showMenu}
          />
        )}
      </div>
    </header>
  );
};

const mapStateToProps = state => {
  return { cart: state.cartReducer };
};

export default connect(mapStateToProps, { logOutAction })(Header);
