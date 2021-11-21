import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import FirstSection from './ProductSections/FirstSection';
import FeaturesSection from './ProductSections/FeaturesSection';
import GallerySection from './ProductSections/GallerySection';
import SuggestionSection from './ProductSections/SuggestionSection';
import CategoriesSection from '../../reusables/CategoriesSection';
import AboutSection from '../Home/Sections/AboutSection';
import { getProductsAction } from '../../../Redux/actions/actions';

const ProductPage = ({ getProductsAction, products }) => {
  const { slug } = useParams();

  useEffect(() => {
    getProductsAction();

    window.scroll(0, 0);
  }, [getProductsAction]);

  const product = products?.filter(product => product?.slug === slug)[0];

  return (
    <main className='w-full pb-32'>
      <FirstSection product={product} />
      <FeaturesSection product={product} />
      <GallerySection product={product} />
      <SuggestionSection products={products} />
      <CategoriesSection />
      <AboutSection />
    </main>
  );
};

const mapStateToProps = state => {
  return { products: state.productsReducer.products };
};

export default connect(mapStateToProps, { getProductsAction })(ProductPage);
