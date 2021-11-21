import React from 'react';

const Overview = () => {
  return (
    <div className='w-full h-screen grid grid-cols-2 grid-rows-12 gap-8 py-16 px-20'>
      <div className='col-span-2 self-end pb-2'>
        <h2 className='text-white shadow py-2 pl-2'>Dashboard</h2>
      </div>

      <div className='bg-gray flex shadow-xl justify-center items-center col-span-1 row-span-4 rounded-xl'>
        <h6 className=''>Coming Soon</h6>
      </div>
      <div className='bg-gray flex shadow-xl justify-center items-center col-span-1 row-span-4 rounded-xl'>
        <h6 className=''>Coming Soon</h6>
      </div>
      <div className='bg-gray flex shadow-xl justify-center items-center col-span-2 row-span-4 rounded-xl'>
        <h6 className=''>Coming Soon</h6>
      </div>
    </div>
  );
};

export default Overview;
