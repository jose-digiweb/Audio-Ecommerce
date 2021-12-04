import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { HashRouter, Switch, Route, NavLink, useHistory } from 'react-router-dom';
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
import { logOutAction } from '../../Redux/actions/actions';

import Logo from '../reusables/Logo';

export const Dashboard = ({ logOutAction, setIsLogged, setShowMessage }) => {
  const history = useHistory();
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
              <NavLink
                exact
                to='/'
                className='dashboardLinks'
                activeClassName='activeDashboardLink'
              >
                <DashboardLink
                  url='dashboard/icons'
                  path='dashboardWhite.svg'
                  text='Dashboard'
                />
              </NavLink>
              <NavLink
                exact
                to='/products'
                className='dashboardLinks'
                activeClassName='activeDashboardLink'
              >
                <DashboardLink
                  url='dashboard/icons'
                  path='inventoryWhite.svg'
                  text='Products'
                />
              </NavLink>
              <NavLink
                exact
                to='/orders'
                className='dashboardLinks'
                activeClassName='activeDashboardLink'
              >
                <DashboardLink
                  url='dashboard/icons'
                  path='ordersWhite.svg'
                  text='Orders'
                />
              </NavLink>
              <NavLink
                exact
                to='/create'
                className='dashboardLinks'
                activeClassName='activeDashboardLink'
              >
                <DashboardLink
                  url='dashboard/icons'
                  path='addCircleWhite.svg'
                  text='Create Product'
                />
              </NavLink>
              <NavLink
                exact
                to='/edit'
                className='dashboardLinks'
                activeClassName='activeDashboardLink'
              >
                <DashboardLink
                  url='dashboard/icons'
                  path='editWhite.svg'
                  text='Edit Product'
                />
              </NavLink>
              <NavLink
                exact
                to='/add-admin'
                className='dashboardLinks'
                activeClassName='activeDashboardLink'
              >
                <DashboardLink
                  url='dashboard/icons'
                  path='addPersonWhite.svg'
                  text='Add New Admin'
                />
              </NavLink>
              <NavLink
                exact
                to='/settings'
                className='dashboardLinks'
                activeClassName='activeDashboardLink'
              >
                <DashboardLink
                  url='dashboard/icons'
                  path='settingsWhite.svg'
                  text='Settings'
                />
              </NavLink>

              <div
                onClick={() => logOutAction(history, setIsLogged, setCurProduct)}
                className='dashboardLinks flex cursor-pointer bg-primary-light py-2 px-2 hover:bg-opacity-80'
              >
                <ImageRender url='shared/desktop' path='signOut.svg' />
                <p className='ml-2 text-gray-dark hover:text-gray-900 font-bold'>
                  Sign out
                </p>
              </div>
            </div>

            <Logo onClick={() => history.push('/')} />
          </div>

          <div className='container-tv h-screen bg-primary-light'>
            <div className='w-full h-screen'>
              <Switch>
                <Route path='/' exact>
                  <Overview />
                </Route>

                <Route path='/products' exact>
                  <Products setCurProduct={setCurProduct} />
                </Route>

                <Route path='/orders' exact>
                  <Orders />
                </Route>

                <Route path='/create' exact>
                  <CreateProduct />
                </Route>

                <Route path='/edit' exact>
                  <EditProduct curProduct={curProduct} />
                </Route>

                <Route path='/add-admin' exact>
                  <CreateAdmin />
                </Route>

                <Route path='/settings' exact>
                  <Settings
                    setShowMessage={setShowMessage}
                    setReRender={setReRender}
                    currentUser={user}
                  />
                </Route>
              </Switch>
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
