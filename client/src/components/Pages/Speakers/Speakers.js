import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import CategoryHero from '../../reusables/CategoryHero';
import ProductsSection from './Sections/ProductsSection';
import CategoriesSection from '../../reusables/CategoriesSection';
import AboutSection from '../Home/Sections/AboutSection';
import { getProductsAction } from '../../../Redux/actions/actions';

const Speakers = ({ getProductsAction, products }) => {
  useEffect(() => {
    getProductsAction();

    window.scroll(0, 0);
  }, [getProductsAction]);

  const speakers = products?.filter(product => product.category === 'speakers');

  return (
    <main className='container-desktop pb-28'>
      <CategoryHero title='speakers' />
      <ProductsSection products={speakers} />
      <CategoriesSection />
      <AboutSection />
    </main>
  );
};

const mapStateToProps = state => {
  return { products: state.productsReducer.products };
};

export default connect(mapStateToProps, { getProductsAction })(Speakers);
