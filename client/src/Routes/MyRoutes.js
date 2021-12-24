import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from '../Components/Pages/Layout/Layout';
import Home from '../Components/Pages/Home/Home';
import Headphones from '../Components/Pages/Headphones/Headphones';
import Speakers from '../Components/Pages/Speakers/Speakers';
import Earphones from '../Components/Pages/Earphones/Eearphones';
import ProductPage from '../Components/Pages/ProductPage/ProductPage';
import CheckoutPage from '../Components/Pages/Checkout/CheckoutPage';
import Dashboard from '../Components/Dashboard/Dashboard';
import Auth from '../Components/Auth/Auth';
import ResetPassword from '../Components/Auth/ForgotPassword/ResetPassword';
import SuccessModal from '../Components/SuccessModal/SuccessModal';

import Profile from '../Components/UserProfile/subSection/Profile';
import MyOrders from '../Components/UserProfile/subSection/MyOrders';
import ShippingDetails from '../Components/UserProfile/subSection/ShippingDetails';
import ProfileSettings from '../Components/UserProfile/subSection/ProfileSettings';
import UserProfile from '../Components/UserProfile/UserProfile';
import NotFound from '../Components/Pages/NotFound/NotFound';

const MyRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='headphones' element={<Headphones />} />
        <Route path='speakers' element={<Speakers />} />
        <Route path='earphones' element={<Earphones />} />
        <Route path='product/:slug' element={<ProductPage />} />
        <Route path='checkout' element={<CheckoutPage />}>
          <Route path='success' element={<SuccessModal />} />
        </Route>
      </Route>

      <Route path='/users' element={<UserProfile />}>
        <Route path='/users' element={<NotFound />} />
        <Route path='me/:id' element={<Profile />} />
        <Route path='my-orders/:id' element={<MyOrders />} />
        <Route path='shipping-details/:id' element={<ShippingDetails />} />
        <Route path='profile-settings/:id' element={<ProfileSettings />} />
      </Route>

      <Route path='/auth' element={<Auth />} />
      <Route path='/forgot-password/:token' element={<ResetPassword />} />

      <Route path='/admin/dashboard' element={<Dashboard />} />

      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default MyRoutes;
