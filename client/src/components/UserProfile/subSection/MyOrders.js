import React, { useEffect, useState, useContext } from 'react';

import { AppContext } from '../../../Contexts/AppContext';
import RenderOrders from '../Reusable/RenderOrders';
import { getUser, View } from '../../../helper';

const MyOrders = () => {
  const { isLogged } = useContext(AppContext);
  const [purchases, setPurchases] = useState(isLogged?.loggedUser?.purchases);
  const { profileNav } = View();

  useEffect(() => {
    (async () => {
      const { loggedUser } = await getUser();

      setPurchases(loggedUser.purchases);
    })();
  }, []);

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center pt-24 pl-10 tablet:h-auto tablet:pl-0 tablet:justify-start  mobile:justify-start mobile:pl-0 mobile:h-screen'>
      <div className='w-full'>
        <h5 className='text-white mb-2 pb-2 border-b-2'>My orders</h5>
      </div>

      <div
        className={`w-full h-3/5 flex flex-col  bg-gray px-10 py-4 my-6 rounded-md overflow-y-scroll scrollbar-thin scrollbar-thumb-primary mobile:px-4 mobile:h-4/5  ${
          profileNav ? 'tablet:h-3/5' : 'tablet:h-4/5'
        }`}
      >
        <RenderOrders purchases={purchases} />
      </div>
    </div>
  );
};

export default MyOrders;
