import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import HeroSection from './Sections/HeroSection';
import CategoriesSection from '../../reusables/CategoriesSection';
import FeaturedSection from './Sections/FeaturedSection';
import AboutSection from './Sections/AboutSection';
import { getProductsAction } from '../../../Redux/actions/actions';

const Home = ({ getProductsAction, products }) => {
  useEffect(() => {
    getProductsAction();

    window.scroll(0, 0);
  }, [getProductsAction]);

  return (
    <main className='pb-56 tablet:pb-20 mobile:pb-28'>
      <HeroSection products={products} />
      <CategoriesSection />
      <FeaturedSection products={products} />
      <AboutSection />
    </main>
  );
};

const mapStateToProps = state => {
  return { products: state.productsReducer.products };
};

export default connect(mapStateToProps, { getProductsAction })(Home);
