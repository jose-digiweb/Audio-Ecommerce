import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

import MobileNavLink from '../../reusables/MobileNavLink';
import { activeNavLink, View } from '../../../helper';

const Nav = ({ showMenu, setShowMenu }) => {
  const { desktop, tablet, mobile } = View();

  let height;
  if (tablet) height = -430;
  if (mobile) height = -930;

  const [showNav, api] = useSpring(() => ({
    translateY: height,
    config: { friction: 18 },
    reverse: true,
  }));
  api.start({ translateY: showMenu ? 0 : height });

  return (
    <React.Fragment>
      {desktop && (
        <nav className={`text-white text-navLink font-bold uppercase`}>
          <div className='w-full flex container-desktop'>
            <NavLink
              style={activeNavLink}
              className={`pr-9 hover:text-primary`}
              to='/'
            >
              home
            </NavLink>
            <NavLink
              style={activeNavLink}
              className={`pr-9 hover:text-primary`}
              to='/headphones'
            >
              headphones
            </NavLink>
            <NavLink
              style={activeNavLink}
              className={`pr-9 hover:text-primary`}
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
      )}
      {tablet || mobile ? (
        <animated.nav
          style={showNav}
          className='w-full bg-white absolute top-20 left-0 rounded-b-2xl shadow-md mobile:py-8'
        >
          <animated.div
            style={showNav}
            className='container flex justify-between mobile:flex-col'
          >
            <MobileNavLink
              setShowMenu={setShowMenu}
              url='shared/desktop/'
              path='/image-headphones.png'
              text='headphones'
              href='/headphones'
              styles=''
            />

            <MobileNavLink
              setShowMenu={setShowMenu}
              url='shared/desktop/'
              path='/image-speakers.png'
              text='speakers'
              href='/speakers'
              styles=''
            />

            <MobileNavLink
              setShowMenu={setShowMenu}
              url='shared/desktop/'
              path='/image-earphones.png'
              text='earphones'
              href='/earphones'
              styles=''
            />
          </animated.div>
        </animated.nav>
      ) : null}
    </React.Fragment>
  );
};

export default Nav;
