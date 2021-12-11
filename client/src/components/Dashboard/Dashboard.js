import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { HashRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

//==> COMPONENTS
import Overview from './Sections/Overview';
import Products from './Sections/Products';
import Orders from './Sections/Orders';
import CreateProduct from './Sections/CreateProduct';
import EditProduct from './Sections/EditProduct';
import Settings from './Sections/Settings';
import DashboardLink from './reusable/DashboardLink';
import CreateAdmin from './Sections/CreateAdmin';
import UserGreeting from './reusable/UserGreeting';
import ImageRender from '../reusables/ImageRender';
import ForbiddenPage from '../reusables/ForbiddenPage';
import DesktopViewWarning from '../reusables/DesktopViewWarning';
import { logOutAction } from '../../Redux/actions/authAction';
import { AppContext } from '../../Contexts/AppContext';

import Logo from '../reusables/Logo';

export const Dashboard = ({ logOutAction }) => {
  const { setIsLogged, setShowMessage } = useContext(AppContext);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('loggedUser')));

  const [curProduct, setCurProduct] = useState();
  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('loggedUser')));
  }, [reRender]);

  const desktopViewport = useMediaQuery({ minWidth: 1280 });

  return (
    <HashRouter basename='/'>
      {!desktopViewport && <DesktopViewWarning />}
      {user?.loggedUser?.role === 'admin' ? (
        <div
          className={`${
            !desktopViewport
              ? 'hidden'
              : 'flex overflow-hidden bg-primary-light h-screen'
          }`}
        >
          <div className='flex relative flex-col justify-between w-full min-w-1 max-w-xs pl-4 pb-4 h-full bg-primary'>
            <UserGreeting user={user} />

            <div className='flex flex-col mt-32'>
              <NavLink to='/' className='dashboardLinks'>
                <DashboardLink
                  url='dashboard/icons'
                  path='dashboardWhite.svg'
                  text='Dashboard'
                />
              </NavLink>
              <NavLink to='/products' className='dashboardLinks'>
                <DashboardLink
                  url='dashboard/icons'
                  path='inventoryWhite.svg'
                  text='Products'
                />
              </NavLink>
              <NavLink to='/orders' className='dashboardLinks'>
                <DashboardLink
                  url='dashboard/icons'
                  path='ordersWhite.svg'
                  text='Orders'
                />
              </NavLink>
              <NavLink to='/create' className='dashboardLinks'>
                <DashboardLink
                  url='dashboard/icons'
                  path='addCircleWhite.svg'
                  text='Create Product'
                />
              </NavLink>
              <NavLink to='/edit' className='dashboardLinks'>
                <DashboardLink
                  url='dashboard/icons'
                  path='editWhite.svg'
                  text='Edit Product'
                />
              </NavLink>
              <NavLink to='/add-admin' className='dashboardLinks'>
                <DashboardLink
                  url='dashboard/icons'
                  path='addPersonWhite.svg'
                  text='Add New Admin'
                />
              </NavLink>
              <NavLink to='/settings' className='dashboardLinks'>
                <DashboardLink
                  url='dashboard/icons'
                  path='settingsWhite.svg'
                  text='Settings'
                />
              </NavLink>

              <div
                onClick={() => logOutAction(Navigate, setIsLogged, setCurProduct)}
                className='dashboardLinks flex cursor-pointer bg-primary-light py-2 px-2 hover:bg-opacity-80'
              >
                <ImageRender url='shared/desktop' path='signOut.svg' />
                <p className='ml-2 text-gray-dark hover:text-gray-900 font-bold'>
                  Sign out
                </p>
              </div>
            </div>

            <Logo onClick={() => Navigate('/')} />
          </div>

          <div className='container-tv h-screen bg-primary-light'>
            <div className='w-full h-screen'>
              <Routes>
                <Route path='/' element={<Overview />} />

                <Route
                  path='/products'
                  element={<Products setCurProduct={setCurProduct} />}
                />

                <Route path='/orders' element={<Orders />} />

                <Route path='/create' element={<CreateProduct />} />

                <Route
                  path='/edit'
                  element={<EditProduct curProduct={curProduct} />}
                />

                <Route path='/add-admin' element={<CreateAdmin />} />

                <Route
                  path='/settings'
                  element={
                    <Settings
                      setShowMessage={setShowMessage}
                      setReRender={setReRender}
                      currentUser={user}
                    />
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <ForbiddenPage text='Restricted to Admins only!' btnText='Back to home' />
      )}
    </HashRouter>
  );
};

const mapStateToProps = state => {
  return { products: state.productsReducer.products };
};

export default connect(mapStateToProps, { logOutAction })(Dashboard);
