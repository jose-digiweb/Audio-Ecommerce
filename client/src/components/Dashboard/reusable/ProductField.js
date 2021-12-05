import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { deleteProductAction } from '../../../Redux/actions/productAction';

const ProductField = ({
  setReRender,
  product,
  deleteProductAction,
  setCurProduct,
}) => {
  const handleDeleteProduct = () => {
    deleteProductAction(product._id);

    setReRender(prev => !prev);
  };

  const handleEdit = () => {
    Navigate('/edit');

    setCurProduct(product);
  };

  return (
    <div className='grid w-full h-28 mb-4 rounded-md overflow-hidden grid-cols-12 grid-rows-1 shadow-md'>
      <div className='col-span-3 bg-white pl-4 pr-2 py-2'>
        <div className='mb-1 pb-2'>
          <h6>Name</h6>
        </div>
        <p>{product?.name}</p>
      </div>
      <div className='col-span-3 bg-white px-2 py-2'>
        <div className='mb-1 pb-2'>
          <h6>Description</h6>
        </div>

        <div className='overflow-y-scroll h-12 scrollbar-thin scrollbar-thumb-gray-300'>
          <p>{product?.description}</p>
        </div>
      </div>
      <div className='col-span-2 bg-white px-2 py-2  pl-2'>
        <div className='mb-1 pb-2'>
          <h6>Price</h6>
        </div>
        <p>$ {product?.price}</p>
      </div>
      <div className='col-span-2 bg-white px-2 py-2'>
        <div className='mb-1 pb-2'>
          <h6>Category</h6>
        </div>
        <p>{product?.category}</p>
      </div>
      <div className='col-span-2 flex flex-col justify-around bg-white pr-4 py-2'>
        <button
          onClick={handleEdit}
          className='bg-primary text-white py-1 px-2 rounded-md shadow-md hover:bg-primary-light hover:shadow-inner'
        >
          Edit
        </button>
        <button
          onClick={handleDeleteProduct}
          className='bg-gray-300 py-1 px-2 rounded-md hover:shadow-md hover:bg-red-500 hover:text-white'
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default connect(null, { deleteProductAction })(ProductField);
