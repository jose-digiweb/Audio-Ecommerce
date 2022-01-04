import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';

import { AppContext } from '../../Contexts/AppContext';
import useScrollBlock from '../reusables/useScrollBlock';
import { removeProductAction } from '../../Redux/actions/cartAction';
import ImageRender from '../reusables/ImageRender';
import { formatNumber, cartCalc } from '../../helper';

const SuccessModal = ({ removeProductAction }) => {
  const { showSuccessModal, setShowSuccessModal } = useContext(AppContext);
  const [blockScroll, allowScroll] = useScrollBlock();

  const products = JSON.parse(localStorage.getItem('cartItems')) || [];
  const [total, grandTotal] = cartCalc(products);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    removeProductAction();
    setShowSuccessModal(false);
    allowScroll();
    navigate('/');
  };

  blockScroll();

  return (
    <div
      className={`${
        showSuccessModal
          ? 'absolute w-full h-screen flex justify-center items-center bg-black bg-opacity-50 inset-0 z-50 mobile:px-4'
          : 'hidden'
      }`}
    >
      <div className='w-auto bg-white rounded-md p-10 mobile:p-6'>
        <div className='mb-6 mr-16 mobile:w-full'>
          <div className='p-4 mb-6 bg-primary rounded-full inline-block'>
            <ImageRender url='shared/desktop' path='check.svg' />
          </div>
          <MediaQuery minWidth={500}>
            <h3 className='mb-4'>
              THANK YOU
              <br /> FOR YOUR ORDER
            </h3>
          </MediaQuery>
          <MediaQuery maxWidth={499}>
            <h5 className='mb-4 leading-7 tracking-tighter'>
              THANK YOU
              <br /> FOR YOUR ORDER
            </h5>
          </MediaQuery>
          <p className='mobile:w-full'>
            You will receive an email confirmation shortly.
          </p>
        </div>
        <div className='w-full flex justify-between mb-10 mobile:flex-col'>
          <div className='w-3/5 flex flex-col bg-gray items-center px-4 rounded-l-lg mobile:w-full mobile:rounded-b-none mobile:rounded-t-lg'>
            <div className='w-full flex items-center justify-between pt-4 pb-2 border-b-2'>
              <div className='flex items-center justify-center'>
                <div className='mr-4'>
                  <ImageRender
                    url={`products/${products[0]?.name.split(' ').join('-')}`}
                    path={products[0]?.image}
                    transform={{ width: '60px' }}
                  />
                </div>

                <div className='w-full flex flex-col'>
                  <span className='font-bold text-sm'>
                    {products[0]?.name.startsWith('XX99')
                      ? products[0]?.name
                          .split('Headphones')[0]
                          .replace('Mark', 'MK')
                      : products[0]?.name.split(' ')[0]}
                  </span>
                  <span className='text-gray-500 text-sm font-bold'>
                    {`$ ${formatNumber(total)}`}
                  </span>
                </div>
              </div>

              <div className='text-gray-500 bg-gray font-bold'>
                x{products[0]?.quantity}
              </div>
            </div>
            <div className='pt-2 pb-4 text-sm'>
              {products?.length > 2 && (
                <span>and {products?.length - 1} other items</span>
              )}
              {products?.length === 2 && (
                <span>and {products?.length - 1} other item</span>
              )}
              {products?.length === 1 && null}
            </div>
          </div>
          <div className='w-2/5 flex flex-col justify-center pl-6 bg-black rounded-r-lg mobile:w-full mobile:rounded-t-none mobile:rounded-b-lg mobile py-4'>
            <div className='mobile:mb-2'>
              <span className='text-white text-xs opacity-60 uppercase'>
                grand total
              </span>
            </div>
            <div>
              <span className='text-white text-sm uppercase'>
                $ {formatNumber(grandTotal)}
              </span>
            </div>
          </div>
        </div>
        <div className='w-full'>
          <button
            onClick={handleButtonClick}
            className='w-full text-white text-sm bg-primary py-2 uppercase'
          >
            back to home
          </button>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { removeProductAction })(SuccessModal);
