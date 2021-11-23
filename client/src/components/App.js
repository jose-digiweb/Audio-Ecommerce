import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './Header/Header';
import Footer from './Footer/Footer';
import Home from './Pages/Home/Home';
import Headphones from './Pages/Headphones/Headphones';
import Speakers from './Pages/Speakers/Speakers';
import Earphones from './Pages/Earphones/Eearphones';
import Dashboard from './Dashboard/Dashboard';
import Auth from './Auth/Auth';
import ProductPage from './Pages/ProductPage/ProductPage';
import CheckoutPage from './Pages/Checkout/CheckoutPage';
import SuccessModal from './SuccessModal/SuccessModal';

import Cart from './Cart/Cart';
import NotFound from './Pages/NotFound/NotFound';

function App() {
  const [showCart, setShowCart] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  return (
    <React.Fragment>
      <BrowserRouter>
        <Header setShowCart={setShowCart} />
        <Cart setShowCart={setShowCart} showCart={showCart} />
        <SuccessModal
          setShowSuccessModal={setShowSuccessModal}
          showSuccessModal={showSuccessModal}
        />

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
            <CheckoutPage setShowSuccessModal={setShowSuccessModal} />
            <Footer />
          </Route>

          <Route path='/auth' exact>
            <Auth />
          </Route>

          <Route path='/admin/dashboard' exact>
            <Dashboard />
          </Route>

          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
