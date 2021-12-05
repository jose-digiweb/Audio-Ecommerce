import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import MediaQuery, { useMediaQuery } from 'react-responsive';

import { formatNumber } from '../../../../helper';
import ImageRender from '../../../reusables/ImageRender';
import CartQtyButton from '../../../reusables/CartQtyButton';
import {
  addToCartAction,
  updateCartAction,
} from '../../../../Redux/actions/cartAction';

const FirstSection = ({ addToCartAction, updateCartAction, product, cart }) => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartQuantity =
    cartItems?.filter(item => item.id === product?._id)[0]?.quantity || 1;

  useEffect(() => {}, [cart]);

  const navigate = useNavigate();

  const desktopViewport = useMediaQuery({ minWidth: 1280 });
  const tabletViewport = useMediaQuery({ minWidth: 501, maxWidth: 1279 });
  const smallViewport = useMediaQuery({ maxWidth: 500 });

  let imageTransform;
  if (desktopViewport) {
    imageTransform = { width: '540px', radius: 10 };
  }
  if (tabletViewport) {
    imageTransform = {
      width: '281px',
      height: '480px',
      radius: 10,
    };
  }
  if (smallViewport) {
    imageTransform = {
      radius: 10,
    };
  }

  const handleAddToCart = () => {
    const productCart = {
      id: product?._id,
      name: product?.name,
      price: product?.price,
      quantity: cartQuantity,
      image: product?.coverImage?.imageName,
    };

    addToCartAction(productCart);
  };

  const handleUpdateBtn = (action, product) => {
    const updatedProduct = {
      id: product._id,
      image: product.coverImage.imageName,
      name: product.name,
      price: product.price,
      quantity: action === 'plus' ? cartQuantity + 1 : cartQuantity - 1,
    };

    if (updatedProduct.quantity < 1) return;

    if (cartItems?.filter(item => item.id === product?._id).length === 0)
      return addToCartAction(updatedProduct);

    updateCartAction(updatedProduct);
  };

  return (
    <section className='w-full pt-16 mobile:pt-4'>
      <div className='container'>
        <p onClick={() => navigate(-1)} className='cursor-pointer'>
          Go Back
        </p>

        <div className='flex justify-between pt-10 mb-36 mobile:flex-col mobile:mb-20 mobile:pt-6'>
          <div className={`w-1/2 mr-32 tablet:mr-2 mobile:w-full mobile:mb-10`}>
            <ImageRender
              url={`products/${product?.name?.split(' ').join('-')}`}
              path={`${product?.coverImage.imageName}`}
              transform={imageTransform}
            />
          </div>
          <div className='w-1/2 flex flex-col justify-center mobile:w-full'>
            <div className=''>
              <MediaQuery minWidth={1280}>
                {product?.category === 'speakers' ? (
                  <h1 className='mb-14'>
                    {product?.name.split(' ')[0]}
                    <br />
                    {product?.name.split(' ')[1]}
                  </h1>
                ) : (
                  <h1 className='mb-14'>{product?.name}</h1>
                )}
              </MediaQuery>

              <MediaQuery maxWidth={1279}>
                {product?.category === 'speakers' ? (
                  <h3 className='mb-14 tablet:mb-10 mobile:mb-10'>
                    {product?.name.split(' ')[0]}
                    <br />
                    {product?.name.split(' ')[1]}
                  </h3>
                ) : (
                  <h3 className='mb-14 tablet:mb-10 mobile:mb-10'>
                    {product?.name}
                  </h3>
                )}
              </MediaQuery>

              <p className='mb-6 max-w-2'>{product?.description}</p>

              <h5 className='mb-10'>{`$ ${formatNumber(product?.price)}`}</h5>
            </div>

            <div className='flex'>
              <CartQtyButton
                product={product}
                cartQuantity={cartQuantity}
                handleUpdateBtn={handleUpdateBtn}
              />

              <div>
                <button
                  onClick={handleAddToCart}
                  type='button'
                  className={
                    'bg-primary text-white py-2 px-6 ml-4 uppercase hover:bg-primary-light'
                  }
                >
                  add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = state => {
  return { cart: state.cartReducer };
};

export default connect(mapStateToProps, { addToCartAction, updateCartAction })(
  FirstSection
);
