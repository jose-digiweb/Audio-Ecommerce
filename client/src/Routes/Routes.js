import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Footer from '../components/Footer/Footer';
import Home from '../components/Pages/Home/Home';
import Headphones from '../components/Pages/Headphones/Headphones';
import Speakers from '../components/Pages/Speakers/Speakers';
import Earphones from '../components/Pages/Earphones/Eearphones';
import Dashboard from '../components/Dashboard/Dashboard';
import Auth from '../components/Auth/Auth';
import ProductPage from '../components/Pages/ProductPage/ProductPage';
import CheckoutPage from '../components/Pages/Checkout/CheckoutPage';

import Profile from '../components/UserProfile/subSection/Profile';
import MyOrders from '../components/UserProfile/subSection/MyOrders';
import ShippingDetails from '../components/UserProfile/subSection/ShippingDetails';
import ProfileSettings from '../components/UserProfile/subSection/ProfileSettings';
import ForbiddenPage from '../components/reusables/ForbiddenPage';
import UserProfile from '../components/UserProfile/UserProfile';
import NotFound from '../components/Pages/NotFound/NotFound';

const Routes = ({ setShowSuccessModal, setShowMessage, isLogged, setIsLogged }) => {
  return (
    <Switch>
      <Route path='/' exact>
        <Home />
        <Footer />
      </Route>

      <Route path='/headphones' exact>
        <Headphones />
        <Footer />
      </Route>

      <Route path='/speakers' exact>
        <Speakers />
        <Footer />
      </Route>

      <Route path='/earphones' exact>
        <Earphones />
        <Footer />
      </Route>

      <Route path='/product/:slug' exact>
        <ProductPage />
        <Footer />
      </Route>

      <Route path='/checkout' exact>
        <CheckoutPage
          setShowSuccessModal={setShowSuccessModal}
          setShowMessage={setShowMessage}
        />
        <Footer />
      </Route>

      <Route path='/auth' exact>
        <Auth setIsLogged={setIsLogged} setShowMessage={setShowMessage} />
      </Route>

      <Route path='/admin/dashboard' exact>
        <Dashboard
          setShowMessage={setShowMessage}
          isLogged={isLogged}
          setIsLogged={setIsLogged}
        />
      </Route>

      <Route path='/me/:id' exact>
        {'jwtToken' in isLogged ? (
          <UserProfile isLogged={isLogged}>
            <Profile isLogged={isLogged} />
          </UserProfile>
        ) : (
          <ForbiddenPage
            text='Only Registered Users! Please create an account or Login.'
            btnText='Back to home'
          />
        )}
      </Route>

      <Route path='/my-orders/:id' exact>
        {'jwtToken' in isLogged ? (
          <UserProfile isLogged={isLogged}>
            <MyOrders isLogged={isLogged} />
          </UserProfile>
        ) : (
          <ForbiddenPage
            text='Only Registered Users! Please create an account or Login.'
            btnText='Back to home'
          />
        )}
      </Route>

      <Route path='/shipping-details/:id' exact>
        {'jwtToken' in isLogged ? (
          <UserProfile isLogged={isLogged}>
            <ShippingDetails
              setShowMessage={setShowMessage}
              isLogged={isLogged}
              setIsLogged={setIsLogged}
            />
          </UserProfile>
        ) : (
          <ForbiddenPage
            text='Only Registered Users! Please create an account or Login.'
            btnText='Back to home'
          />
        )}
      </Route>

      <Route path='/profile-settings/:id' exact>
        {'jwtToken' in isLogged ? (
          <UserProfile isLogged={isLogged}>
            <ProfileSettings
              setIsLogged={setIsLogged}
              isLogged={isLogged}
              setShowMessage={setShowMessage}
            />
          </UserProfile>
        ) : (
          <ForbiddenPage
            text='Only Registered Users! Please create an account or Login.'
            btnText='Back to home'
          />
        )}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
