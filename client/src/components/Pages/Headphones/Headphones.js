import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import CategoryHero from '../../reusables/CategoryHero';
import ProductsSection from './Sections/ProductsSection';
import CategoriesSection from '../../reusables/CategoriesSection';
import { getProductsAction } from '../../../Redux/actions/productAction';

const Headphones = ({ getProductsAction, products }) => {
  useEffect(() => {
    getProductsAction();

    window.scroll(0, 0);
  }, [getProductsAction]);

  const headphones = products?.filter(product => product.category === 'headphones');

  return (
    <React.Fragment>
      <CategoryHero title='headphones' />
      <ProductsSection products={headphones} />
      <CategoriesSection />
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return { products: state.productsReducer.products };
};

export default connect(mapStateToProps, { getProductsAction })(Headphones);
