import React from 'react';
import { NavLink } from 'react-router-dom';

import { activeNavLink } from '../../helper';

const Nav = ({ styles }) => {
  return (
    <nav className={`text-white text-navLink font-bold uppercase ${styles}`}>
      <div className='w-full flex container-desktop mobile:flex-col mobile:items-center'>
        <NavLink
          style={activeNavLink}
          className={`pr-9 hover:text-primary mobile:pr-0  mobile:mb-6`}
          to='/'
        >
          home
        </NavLink>
        <NavLink
          style={activeNavLink}
          className={`pr-9 hover:text-primary mobile:pr-0  mobile:mb-6`}
          to='/headphones'
        >
          headphones
        </NavLink>
        <NavLink
          style={activeNavLink}
          className={`pr-9 hover:text-primary mobile:pr-0  mobile:mb-6`}
          to='/speakers'
        >
          speakers
        </NavLink>
        <NavLink
          style={activeNavLink}
          className={`hover:text-primary`}
          to='/earphones'
        >
          earphones
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
