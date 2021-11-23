import React from 'react';
import { NavLink } from 'react-router-dom';
import MediaQuery from 'react-responsive';

import Button from '../../../reusables/Button';

const HeroSection = ({ products }) => {
  const featuredProduct = products?.filter(
    product => product.name === 'XX99 Mark II Headphones'
  )[0];

  return (
    <section
      className={`w-full bg-black-heroBg tablet:bg-hero-tablet mobile:bg-hero-mobile desktop:bg-hero-desktop bg-contain bg-center bg-no-repeat pb-40 pt-52`}
    >
      <div className='container flex justify-between tablet:justify-center mobile:justify-center'>
        <div className='flex flex-col justify-center desktop:w-full desktop:max-w-md w-1/2 tablet:w-full tablet:items-center tablet:max-w-md mobile:w-full mobile:items-center mobile:text-center'>
          <p className='text-white tracking-larger uppercase mb-4 opacity-50'>
            new product
          </p>
          <MediaQuery minWidth={500}>
            <h1 className='text-white mb-8 uppercase tablet:text-center'>
              {featuredProduct?.name}
            </h1>
          </MediaQuery>

          <MediaQuery maxWidth={499}>
            <span className='text-white mb-8 uppercase text-mobile-header font-bold'>
              {featuredProduct?.name}
            </span>
          </MediaQuery>

          <p className='text-white font-body mb-10 opacity-80 desktop:pr-20 tablet:text-center tablet:px-10'>
            Experience natural, lifelike audio and exceptional build quality made for
            the passionate music enthusiast.
          </p>

          <div>
            <NavLink to={`product/${featuredProduct?.slug}`}>
              <Button styles='btn-primary' text='see product' />
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
