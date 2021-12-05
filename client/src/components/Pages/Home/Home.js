import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import HeroSection from './Sections/HeroSection';
import CategoriesSection from '../../reusables/CategoriesSection';
import FeaturedSection from './Sections/FeaturedSection';
import { getProductsAction } from '../../../Redux/actions/productAction';

const Home = ({ getProductsAction, products }) => {
  useEffect(() => {
    getProductsAction();

    window.scroll(0, 0);
  }, [getProductsAction]);

  return (
    <>
      <HeroSection products={products} />
      <CategoriesSection />
      <FeaturedSection products={products} />
    </>
  );
};

const mapStateToProps = state => {
  return { products: state.productsReducer.products };
};

export default connect(mapStateToProps, { getProductsAction })(Home);
