import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import RenderMessage from './reusables/RenderMessage';
import Cart from './Cart/Cart';
import MyRoutes from '../Routes/MyRoutes';
import { getUser } from '../helper';
import { AppContext } from '../Contexts/AppContext';

const App = () => {
  const [isLogged, setIsLogged] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(true);
  const [showMessage, setShowMessage] = useState({ show: false, payload: {} });

  useEffect(() => {
    (async () => {
      const user = await getUser();
      setIsLogged(user);
    })();
  }, []);

  const contextValues = {
    isLogged,
    setIsLogged,
    showCart,
    setShowCart,
    showSuccessModal,
    setShowSuccessModal,
    showMessage,
    setShowMessage,
  };

  return (
    <BrowserRouter>
      <AppContext.Provider value={contextValues}>
        <Cart />
        <RenderMessage />

        <MyRoutes />
      </AppContext.Provider>
    </BrowserRouter>
  );
};

export default App;
