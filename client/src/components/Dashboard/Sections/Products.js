import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { getProductsAction } from '../../../Redux/actions/productAction';
import ProductField from '../reusable/ProductField';

const Products = ({ getProductsAction, products, setAction, setCurProduct }) => {
  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    getProductsAction();
  }, [getProductsAction, reRender]);

  const renderProduct = () => {
    return products?.map(product => {
      return (
        <ProductField
          setCurProduct={setCurProduct}
          setAction={setAction}
          setReRender={setReRender}
          key={product._id}
          product={product}
        />
      );
    });
  };

  return (
    <div className='w-full h-screen flex flex-col justify-center px-20 py-10 container-tv'>
      <div className='pb-2 mb-8'>
        <h2 className='text-white shadow py-2 pl-2'>Products</h2>
      </div>
      <div className={`scrollbar-thin scrollbar-thumb-primary overflow-y-scroll`}>
        {renderProduct()}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { products: state.productsReducer.products };
};

export default connect(mapStateToProps, { getProductsAction })(Products);
