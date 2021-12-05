import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import CategoryHero from '../../reusables/CategoryHero';
import ProductsSection from './Sections/ProductsSection';
import CategoriesSection from '../../reusables/CategoriesSection';
import { getProductsAction } from '../../../Redux/actions/productAction';

const Speakers = ({ getProductsAction, products }) => {
  useEffect(() => {
    getProductsAction();

    window.scroll(0, 0);
  }, [getProductsAction]);

  const speakers = products?.filter(product => product.category === 'speakers');

  return (
    <React.Fragment>
      <CategoryHero title='speakers' />
      <ProductsSection products={speakers} />
      <CategoriesSection />
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return { products: state.productsReducer.products };
};

export default connect(mapStateToProps, { getProductsAction })(Speakers);
