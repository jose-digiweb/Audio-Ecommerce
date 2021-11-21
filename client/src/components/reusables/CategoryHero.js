import React from 'react';
import MediaQuery from 'react-responsive';

const CategoryHero = ({ title }) => {
  return (
    <section className='w-full bg-black flex justify-center items-center py-24 mobile:pt-14 mobile:pb-8'>
      <MediaQuery minWidth={500}>
        <h1 className='uppercase text-white'>{title}</h1>
      </MediaQuery>

      <MediaQuery maxWidth={499}>
        <span className='text-white uppercase text-mobile-header font-bold'>
          {title}
        </span>
      </MediaQuery>
    </section>
  );
};

export default CategoryHero;
