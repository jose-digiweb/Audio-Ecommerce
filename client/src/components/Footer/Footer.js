import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookSquare, FaTwitter, FaInstagram } from 'react-icons/fa';

import Logo from '../reusables/Logo';
import Nav from '../reusables/Nav';

const Footer = () => {
  return (
    <footer className='w-full bg-black text-white pb-10 tablet:pb-4'>
      <div className='container'>
        <div className='flex justify-between  tablet:flex-col tablet:mb-10 mobile:flex-col mobile:items-center'>
          <Link to='/'>
            <Logo styles='mb-10 tablet:mb-8 tablet:inline-block border-t-4 border-primary pt-16 mobile:mb-0' />
          </Link>
          <Nav styles='pt-16 tablet:pt-0 mobile:mb-16' />
        </div>

        <div className='flex tablet:flex-col mobile:flex-col'>
          <div className='w-1/2 flex flex-col tablet:w-full mobile:w-full mobile:text-center'>
            <p className='mb-20 opacity-50 mobile:mb-10'>
              Audiophile is an all in one stop to fulfill your audio needs. We're a
              small team of music lovers and sound specialists who are devoted to
              helping you get the most out of personal audio. Come and visit our demo
              facility - we’re open 7 days a week.
            </p>

            <span className='opacity-50 mobile:mb-16'>
              Copyright 2021. All Rights Reserved
            </span>
          </div>

          <div className='w-1/2 flex justify-end items-center tablet:w-full tablet:transform tablet:-translate-y-6 mobile:w-full mobile:justify-center'>
            <div className='mr-4'>
              <FaFacebookSquare className='hover:text-primary w-6 h-6 cursor-pointer' />
            </div>

            <div className='mr-4'>
              <FaTwitter className='hover:text-primary w-6 h-6 cursor-pointer' />
            </div>

            <div>
              <FaInstagram className='hover:text-primary w-6 h-6 cursor-pointer' />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
