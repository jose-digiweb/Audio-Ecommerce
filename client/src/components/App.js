import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './Header/Header';
import SuccessModal from './SuccessModal/SuccessModal';
import Cart from './Cart/Cart';
import RenderMessage from './reusables/RenderMessage';
import Routes from '../Routes/Routes';
import { getUser } from '../helper';

const App = () => {
  const [isLogged, setIsLogged] = useState(getUser());
  const [showCart, setShowCart] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showMessage, setShowMessage] = useState({ show: false, payload: {} });

  useEffect(() => {
    (async () => {
      const user = await getUser();
      setIsLogged(user);
    })();
  }, []);

  return (
    <BrowserRouter>
      <Header
        isLogged={isLogged}
        setIsLogged={setIsLogged}
        setShowCart={setShowCart}
      />
      <Cart setShowCart={setShowCart} showCart={showCart} />
      <RenderMessage showMessage={showMessage} />
      <SuccessModal
        setShowSuccessModal={setShowSuccessModal}
        showSuccessModal={showSuccessModal}
      />
      <Routes
        setShowSuccessModal={setShowSuccessModal}
        setShowMessage={setShowMessage}
        isLogged={isLogged}
        setIsLogged={setIsLogged}
      />
    </BrowserRouter>
  );
};

export default App;
