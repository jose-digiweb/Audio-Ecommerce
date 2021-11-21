import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import Nav from './Nav/Nav';
import ImageRender from '../reusables/ImageRender';
import { logOutAction } from '../../Redux/actions/actions';

const Header = ({ logOutAction, setShowCart, cart }) => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const location = useLocation();

  const [showMenu, setShowMenu] = useState(false);
  const [isLogged, setIsLogged] = useState(
    JSON.parse(localStorage.getItem('loggedUser'))
  );

  useEffect(() => {
    setIsLogged(JSON.parse(localStorage.getItem('loggedUser')));
  }, [location, cart]);

  const handleLogout = () => {
    logOutAction(setIsLogged);
  };

  const desktopViewport = useMediaQuery({ minWidth: 1280 });

  const tabletViewport = useMediaQuery({ minWidth: 501, maxWidth: 1279 });

  const smallViewport = useMediaQuery({ maxWidth: 500 });

  if (
    location.pathname === '/auth' ||
    location.pathname === '/admin/dashboard' ||
    location.pathname === '/success'
  )
    return null;

  const headerStyle = () => {
    if (location.pathname === '/') return 'w-full absolute top-0 left-0 z-40';
    else return 'w-full z-40 bg-black';
  };

  return (
    <React.Fragment>
      <header className={headerStyle()}>
        <div
          className={`container flex justify-between items-center py-8 border-b-2 border-opacity-10 mobile:border-b-0`}
        >
          {desktopViewport && (
            <div className='w-full flex justify-between items-center'>
              <Link to='/'>
                <ImageRender url='shared/desktop' path='logo.svg' />
              </Link>

              <Nav
                showMenu={showMenu}
                tabletViewport={tabletViewport}
                smallViewport={smallViewport}
                desktopViewport={desktopViewport}
              />

              <div className={`text-white flex items-center`}>
                <div
                  onClick={() => setShowCart(prev => !prev)}
                  className={`mr-8 cursor-pointer relative`}
                >
                  {cartItems.length > 0 ? (
                    <div className='flex items-center justify-center bg-red-500 rounded-full ml-2 py-cart-pop-y px-cart-pop-x text-white text-cart-pop absolute'>
                      {cartItems.length}
                    </div>
                  ) : null}

                  <ImageRender url='dashboard/icons' path='cartWhite.svg' />
                </div>

                {!isLogged?.jwtToken ? (
                  <Link to='/auth'>
                    <span className={`text-white hover:text-primary`}>Sign In</span>
                  </Link>
                ) : (
                  <Link to='/'>
                    <span
                      onClick={handleLogout}
                      className={`text-5 hover:text-primary`}
                    >
                      Sign Out
                    </span>
                  </Link>
                )}
                {isLogged?.loggedUser?.role === 'admin' && (
                  <Link to='/admin/dashboard'>
                    <button
                      className={`py-1 px-4 ml-8 border-2 text-black bg-white rounded hover:text-white hover:bg-black`}
                    >
                      Dashboard
                    </button>
                  </Link>
                )}
              </div>
            </div>
          )}

          {tabletViewport && (
            <div className='w-full flex justify-between'>
              <div className='flex'>
                <Link
                  onClick={() => setShowMenu(prev => !prev)}
                  to='#'
                  className='mr-8'
                >
                  <ImageRender url='dashboard/icons' path='menuMobile.svg' />
                </Link>

                <Link to='/'>
                  <ImageRender url='shared/desktop' path='logo.svg' />
                </Link>
              </div>

              <Nav
                showMenu={showMenu}
                tabletViewport={tabletViewport}
                smallViewport={smallViewport}
                desktopViewport={desktopViewport}
                setShowMenu={setShowMenu}
              />

              <div className='flex'>
                <div onClick={() => setShowCart(prev => !prev)} className={`mr-8`}>
                  {cartItems.length > 0 ? (
                    <div className='flex items-center justify-center bg-red-500 rounded-full ml-2 py-cart-pop-y px-cart-pop-x text-white text-cart-pop absolute'>
                      {cartItems.length}
                    </div>
                  ) : null}

                  <ImageRender url='dashboard/icons' path='cartWhite.svg' />
                </div>

                {!isLogged?.jwtToken ? (
                  <Link to='/auth'>
                    <span className={`text-white hover:text-primary`}>Sign In</span>
                  </Link>
                ) : (
                  <Link to='/'>
                    <span
                      onClick={handleLogout}
                      className={`text-white text-5 hover:text-primary`}
                    >
                      Sign Out
                    </span>
                  </Link>
                )}
              </div>
            </div>
          )}

          {smallViewport && (
            <div className={`w-full flex justify-between`}>
              <Link onClick={() => setShowMenu(prev => !prev)} to='#'>
                <ImageRender url='dashboard/icons' path='menuMobile.svg' />
              </Link>

              <Link to='/'>
                <ImageRender url='shared/desktop' path='logo.svg' />
              </Link>

              <Nav
                showMenu={showMenu}
                tabletViewport={tabletViewport}
                smallViewport={smallViewport}
                desktopViewport={desktopViewport}
                setShowMenu={setShowMenu}
              />

              <div onClick={() => setShowCart(prev => !prev)}>
                {cartItems.length > 0 ? (
                  <div className='flex items-center justify-center bg-red-500 rounded-full ml-2 py-cart-pop-y px-cart-pop-x text-white text-cart-pop absolute'>
                    {cartItems.length}
                  </div>
                ) : null}

                <ImageRender url='dashboard/icons' path='cartWhite.svg' />
              </div>
            </div>
          )}
        </div>
      </header>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return { cart: state.cartReducer };
};

export default connect(mapStateToProps, { logOutAction })(Header);
