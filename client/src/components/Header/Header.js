import React, { useState, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import UserSection from './UserSection/UserSection';
import Nav from './Nav/Nav';
import ImageRender from '../reusables/ImageRender';
import { headerStyle, View } from '../../helper';

const Header = ({ cart }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { tablet, mobile } = View();

  useEffect(() => {}, [cart]);

  const location = useLocation();

  return (
    <header className={headerStyle(location)}>
      <div className='w-full container flex justify-between items-center py-8 border-b-2 border-opacity-10 mobile:py-6 mobile:border-b-2 mobile:border-opacity-5'>
        {tablet || mobile ? (
          <div className='flex items-center'>
            <div onClick={() => setShowMenu(prev => !prev)} className='mr-4'>
              <ImageRender url='dashboard/icons' path='menuMobile.svg' />
            </div>

            <NavLink to='/' className='mobile:w-32'>
              <ImageRender url='shared/desktop' path='logo.svg' />
            </NavLink>
          </div>
        ) : (
          <NavLink to='/'>
            <ImageRender url='shared/desktop' path='logo.svg' />
          </NavLink>
        )}

        <Nav showMenu={showMenu} setShowMenu={setShowMenu} />

        <UserSection />
      </div>
    </header>
  );
};
const mapStateToProps = state => {
  return { cart: state.cartReducer };
};
export default connect(mapStateToProps)(Header);
