import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from '../components/Pages/Home/Home';
import Headphones from '../components/Pages/Headphones/Headphones';
import Speakers from '../components/Pages/Speakers/Speakers';
import Earphones from '../components/Pages/Earphones/Eearphones';
import Auth from '../components/Auth/Auth';
import ProductPage from '../components/Pages/ProductPage/ProductPage';
import CheckoutPage from '../components/Pages/Checkout/CheckoutPage';
import Dashboard from '../components/Dashboard/Dashboard';

import Profile from '../components/UserProfile/subSection/Profile';
import MyOrders from '../components/UserProfile/subSection/MyOrders';
import ShippingDetails from '../components/UserProfile/subSection/ShippingDetails';
import ProfileSettings from '../components/UserProfile/subSection/ProfileSettings';
import UserProfile from '../components/UserProfile/UserProfile';
import NotFound from '../components/Pages/NotFound/NotFound';
import Layout from '../components/Pages/Layout/Layout';

const MyRoutes = ({
  setShowSuccessModal,
  setShowMessage,
  isLogged,
  setIsLogged,
  setShowCart,
}) => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <Layout
            isLogged={isLogged}
            setIsLogged={setIsLogged}
            setShowCart={setShowCart}
          />
        }
      >
        <Route path='/' element={<Home />} />
        <Route path='headphones' element={<Headphones />} />
        <Route path='speakers' element={<Speakers />} />
        <Route path='earphones' element={<Earphones />} />
        <Route path='product/:slug' element={<ProductPage />} />
        <Route
          path='checkout'
          element={
            <CheckoutPage
              setShowSuccessModal={setShowSuccessModal}
              setShowMessage={setShowMessage}
            />
          }
        />
      </Route>

      <Route
        path='/auth'
        element={<Auth setIsLogged={setIsLogged} setShowMessage={setShowMessage} />}
      />

      <Route
        path='/admin/dashboard'
        element={
          <Dashboard
            setShowMessage={setShowMessage}
            isLogged={isLogged}
            setIsLogged={setIsLogged}
          />
        }
      />

      <Route
        path='/users'
        element={
          <UserProfile
            isLogged={isLogged}
            setIsLogged={setIsLogged}
            setShowCart={setShowCart}
          />
        }
      >
        <Route path='/users' element={<NotFound />} />
        <Route path='me/:id' element={<Profile isLogged={isLogged} />} />
        <Route path='my-orders/:id' element={<MyOrders isLogged={isLogged} />} />
        <Route
          path='shipping-details/:id'
          element={
            <ShippingDetails
              setShowMessage={setShowMessage}
              isLogged={isLogged}
              setIsLogged={setIsLogged}
            />
          }
        />
        <Route
          path='profile-settings/:id'
          element={
            <ProfileSettings
              setIsLogged={setIsLogged}
              isLogged={isLogged}
              setShowMessage={setShowMessage}
            />
          }
        />
      </Route>

      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default MyRoutes;
