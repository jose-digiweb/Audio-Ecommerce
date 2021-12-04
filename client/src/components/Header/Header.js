import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import _ from 'lodash';

import Nav from './Nav/Nav';
import ImageRender from '../reusables/ImageRender';
import { logOutAction } from '../../Redux/actions/actions';
import { headerStyle, getUser } from '../../helper';

const Header = ({ logOutAction, setShowCart, cart, isLogged, setIsLogged }) => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  const [currentUser, setCurrentUser] = useState(isLogged);
  const [showMenu, setShowMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const { loggedUser } = await getUser();

      setCurrentUser(loggedUser);
    })();
  }, [location, isLogged, cart]);

  const handleLogout = () => {
    logOutAction(history, setIsLogged, setCurrentUser);
  };

  const desktopViewport = useMediaQuery({ minWidth: 1280 });

  const tabletViewport = useMediaQuery({ minWidth: 501, maxWidth: 1279 });

  const smallViewport = useMediaQuery({ maxWidth: 500 });

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
                  className={`mr-4 cursor-pointer relative`}
                >
                  {cartItems?.length > 0 ? (
                    <div className='flex items-center justify-center bg-red-500 rounded-full ml-2 py-cart-pop-y px-cart-pop-x text-white text-cart-pop absolute'>
                      {cartItems?.length}
                    </div>
                  ) : null}

                  <ImageRender url='dashboard/icons' path='cartWhite.svg' />
                </div>

                {_.isEmpty(currentUser) && (
                  <Link to='/auth'>
                    <span
                      className={`text-white hover:bg-primary-light ml-4 bg-primary px-4 py-2`}
                    >
                      Sign In
                    </span>
                  </Link>
                )}
                {currentUser?.role === 'admin' && (
                  <Link to='/admin/dashboard'>
                    <button
                      className={`py-1 px-4 ml-8 border-2 text-black bg-white rounded hover:text-white hover:bg-black`}
                    >
                      Dashboard
                    </button>
                  </Link>
                )}
                {currentUser?.role === 'user' && (
                  <div
                    onClick={() => setShowUserMenu(prev => !prev)}
                    className='relative bg-primary ml-6 flex flex-col justify-center items-center rounded-full hover:bg-opacity-90 cursor-pointer'
                  >
                    {_.isEmpty(currentUser.picture) ? (
                      <div className='w-10 h-10 flex justify-center items-center'>
                        <p className=''>
                          {`${currentUser.name.split(' ')[0][0]} ${
                            currentUser.name.split(' ')[1][0]
                          }`}
                        </p>
                      </div>
                    ) : (
                      <div className='w-10 h-10 flex justify-center items-center'>
                        <ImageRender
                          url='users'
                          path={`/${currentUser.picture.picName}`}
                          transform={{ width: 40, radius: 'max' }}
                        />
                      </div>
                    )}

                    {showUserMenu && (
                      <div className='absolute text-black bg-gray top-16 right-0 px-6 py-4 w-56 shadow-lg rounded'>
                        <Link
                          to={`/me/${currentUser.id}`}
                          className='flex pt-2 pb-4 font-bold text-gray-500 hover:text-primary'
                        >
                          <ImageRender url='shared/desktop' path='profile.svg' />
                          <p className='ml-2'>Profile</p>
                        </Link>

                        <Link
                          to={`/my-orders/${currentUser.id}`}
                          className='flex pt-2 pb-4 font-bold text-gray-500 hover:text-primary'
                        >
                          <ImageRender url='shared/desktop' path='shopBag.svg' />
                          <p className='ml-2'>My orders</p>
                        </Link>

                        <Link
                          to={`/profile-settings/${currentUser.id}`}
                          className='flex pt-2 pb-4 font-bold text-gray-500 hover:text-primary'
                        >
                          <ImageRender url='shared/desktop' path='setting.svg' />
                          <p className='ml-2'>Profile settings</p>
                        </Link>

                        <div
                          onClick={handleLogout}
                          className='flex pb-2 pt-4 font-bold text-gray-500 hover:text-red-500 border-t-2'
                        >
                          <ImageRender url='shared/desktop' path='signOut.svg' />
                          <p className='ml-2'>Log out</p>
                        </div>
                      </div>
                    )}
                  </div>
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
