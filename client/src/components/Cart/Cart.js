import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { createPortal } from 'react-dom';
import { NavLink } from 'react-router-dom';

import { AppContext } from '../../Contexts/AppContext';
import { formatNumber, cartCalc, View } from '../../helper';
import useScrollBlock from '../reusables/useScrollBlock';
import CartQtyButton from '../reusables/CartQtyButton';
import ImageRender from '../reusables/ImageRender';
import * as cart from '../../Redux/actions/cartAction';

const Cart = ({ updateCartAction, removeProductAction, cart }) => {
  const products = JSON.parse(localStorage.getItem('cartItems')) || [];

  const { desktop, mobile, tablet } = View();
  const [blockScroll, allowScroll] = useScrollBlock();
  const [total] = cartCalc(products);
  const { showCart, setShowCart } = useContext(AppContext);

  useEffect(() => {}, [cart]);

  const handleUpdateBtn = (action, product) => {
    const updatedProduct = {
      id: product.id,
      image: product.image,
      name: product.name,
      price: product.price,
      quantity: action === 'plus' ? product.quantity + 1 : product.quantity - 1,
    };

    if (updatedProduct.quantity > 0) return updateCartAction(updatedProduct);
    if (updatedProduct.quantity < 1) return removeProductAction(updatedProduct.id);
  };

  const handleCheckoutClick = () => {
    setShowCart(prev => !prev);
  };

  const imageTransform = () => {
    let imageTransform;
    if (desktop) {
      imageTransform = { width: '70px', radius: 10 };
    }
    if (tablet) {
      imageTransform = { width: '70px', radius: 10 };
    }
    if (mobile) {
      imageTransform = { width: '60px', radius: 10 };
    }

    return imageTransform;
  };

  if (showCart) blockScroll();
  if (!showCart) allowScroll();

  return createPortal(
    <section
      onClick={() => setShowCart(prev => !prev)}
      className={`w-full h-screen absolute bg-black bg-opacity-50 top-0 left-0 ${
        showCart ? 'overflow-hidden z-50' : 'hidden'
      }`}
    >
      <div className='container w-full flex justify-end'>
        <div
          onClick={e => e.stopPropagation()}
          className={`bg-white mt-32 p-6 rounded-lg`}
        >
          <div className='w-full flex justify-between items-center border-b-2 border-opacity-40 pb-4 mb-10'>
            <h6 className='uppercase mobile:mr-4'>{`Cart(${products.length})`}</h6>
            {products.length > 0 ? (
              <span
                onClick={() => removeProductAction()}
                className='cursor-pointer hover:underline hover:text-primary'
              >
                Remove all
              </span>
            ) : (
              <span className='select-none'>Add some products</span>
            )}
          </div>
          {products.length > 0 ? (
            products.map(product => (
              <div
                key={product.id}
                className='flex justify-between items-center mb-6'
              >
                <div className='flex mobile:w-1/2 mobile:items-center'>
                  <div className='mobile:min-w-1/2'>
                    <ImageRender
                      url={`products/${product.name.split(' ').join('-')}`}
                      path={product.image}
                      transform={imageTransform()}
                    />
                  </div>

                  <div className='flex flex-col mr-16 ml-4 justify-center mobile:min-w-3/4 mobile:ml-0'>
                    <span className='font-bold text-lg mobile:text-md'>
                      {product.name.startsWith('XX99')
                        ? product.name.split('Headphones')[0].replace('Mark', 'MK')
                        : product.name.split(' ')[0]}
                    </span>
                    <span className='text-gray-500 font-bold'>
                      {`$ ${formatNumber(product.price)}`}
                    </span>
                  </div>
                </div>

                <div className=''>
                  <CartQtyButton
                    product={product}
                    cartQuantity={product.quantity}
                    handleUpdateBtn={handleUpdateBtn}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className='px-16 uppercase font-bold mobile:px-8'>
              <p>your cart is empty</p>
            </div>
          )}
          {products.length > 0 ? (
            <React.Fragment>
              <div className='flex justify-between mb-6'>
                <span className='text-sm opacity-70 uppercase'>total</span>
                <span className='font-bold text-lg'>$ {formatNumber(total)}</span>
              </div>
              <div className='w-full'>
                <NavLink to='/checkout'>
                  <button
                    onClick={handleCheckoutClick}
                    className='w-full text-white text-xs bg-primary py-4 uppercase hover:bg-primary-light'
                  >
                    checkout
                  </button>
                </NavLink>
              </div>
            </React.Fragment>
          ) : null}
        </div>
      </div>
    </section>,

    document.getElementById('cartModal')
  );
};

const mapStateToProps = state => {
  return { cart: state.cartReducer };
};

export default connect(mapStateToProps, {
  updateCartAction: cart.updateCartAction,
  removeProductAction: cart.removeProductAction,
})(Cart);
