import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import SuccessModal from './SuccessModal/SuccessModal';
import RenderMessage from './reusables/RenderMessage';

import MyRoutes from '../Routes/MyRoutes';
import { getUser } from '../helper';
import Cart from './Cart/Cart';

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
      <Cart setShowCart={setShowCart} showCart={showCart} />
      <RenderMessage showMessage={showMessage} />
      <SuccessModal
        setShowSuccessModal={setShowSuccessModal}
        showSuccessModal={showSuccessModal}
      />

      <MyRoutes
        setShowSuccessModal={setShowSuccessModal}
        setShowMessage={setShowMessage}
        isLogged={isLogged}
        setIsLogged={setIsLogged}
        setShowCart={setShowCart}
      />
    </BrowserRouter>
  );
};

export default App;
