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

import Logo from '../reusables/Logo';

export const Dashboard = props => {
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
      {!desktopViewport && (
        <div className='w-full h-screen flex flex-col bg-auth-pattern bg-center  bg-cover justify-center items-center bg-primary text-white'>
          <h1 className='bg-primary-light xs:text-h5 xxs:text-h5 md:text-h1 px-4 py-1 mb-4 rounded uppercase'>
            Only Desktop
          </h1>
          <p className='mb-6'>Dashboard is only available in desktop!</p>
          <button
            onClick={() => history.push('/')}
            className='btn-secondary rounded border-0'
          >
            Back to Home
          </button>
        </div>
      )}
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
              <h5 className='text-white mb-4'>Menu</h5>

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
                  <Settings setReRender={setReRender} currentUser={user} />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      ) : (
        <div className='w-full h-screen flex flex-col bg-auth-pattern bg-center  bg-cover justify-center items-center bg-primary text-white'>
          <h1 className='bg-primary-light px-4 py-1 mb-4 rounded'>Not Authorized</h1>
          <p className='mb-6'>Restricted to Admins only!</p>
          <button
            onClick={() => history.push('/')}
            className='btn-secondary rounded border-0'
          >
            Back to Home
          </button>
        </div>
      )}
    </HashRouter>
  );
};

const mapStateToProps = state => {
  return { products: state.productsReducer.products };
};

export default connect(mapStateToProps)(Dashboard);
