import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import CategoryHero from '../../reusables/CategoryHero';
import ProductsSection from './Sections/ProductsSection';
import CategoriesSection from '../../reusables/CategoriesSection';
import { getProductsAction } from '../../../Redux/actions/productAction';

const Eearphones = ({ getProductsAction, products }) => {
  useEffect(() => {
    getProductsAction();

    window.scroll(0, 0);
  }, [getProductsAction]);

  const earphones = products?.filter(product => product.category === 'earphones');

  return (
    <React.Fragment>
      <CategoryHero title='earphones' />
      <ProductsSection products={earphones} />
      <CategoriesSection />
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return { products: state.productsReducer.products };
};

export default connect(mapStateToProps, { getProductsAction })(Eearphones);
