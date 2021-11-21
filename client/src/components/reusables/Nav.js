import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = ({ styles }) => {
  return (
    <nav className={`text-white text-navLink font-bold uppercase ${styles}`}>
      <div className='w-full flex container-desktop mobile:flex-col mobile:items-center'>
        <NavLink
          activeClassName='text-primary'
          className={`pr-9 hover:text-primary mobile:pr-0  mobile:mb-6`}
          exact
          to='/'
        >
          home
        </NavLink>
        <NavLink
          activeClassName='text-primary'
          className={`pr-9 hover:text-primary mobile:pr-0  mobile:mb-6`}
          exact
          to='/headphones'
        >
          headphones
        </NavLink>
        <NavLink
          activeClassName='text-primary'
          className={`pr-9 hover:text-primary mobile:pr-0  mobile:mb-6`}
          exact
          to='/speakers'
        >
          speakers
        </NavLink>
        <NavLink
          activeClassName='text-primary'
          className={`hover:text-primary`}
          exact
          to='/earphones'
        >
          earphones
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
