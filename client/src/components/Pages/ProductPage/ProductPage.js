import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import FirstSection from './ProductSections/FirstSection';
import FeaturesSection from './ProductSections/FeaturesSection';
import GallerySection from './ProductSections/GallerySection';
import SuggestionSection from './ProductSections/SuggestionSection';
import CategoriesSection from '../../reusables/CategoriesSection';
import { getProductsAction } from '../../../Redux/actions/productAction';

const ProductPage = ({ getProductsAction, products }) => {
  const { slug } = useParams();

  useEffect(() => {
    getProductsAction();

    window.scroll(0, 0);
  }, [getProductsAction]);

  const product = products?.filter(product => product?.slug === slug)[0];

  return (
    <React.Fragment>
      <FirstSection product={product} />
      <FeaturesSection product={product} />
      <GallerySection product={product} />
      <SuggestionSection products={products} />
      <CategoriesSection />
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return { products: state.productsReducer.products };
};

export default connect(mapStateToProps, { getProductsAction })(ProductPage);
