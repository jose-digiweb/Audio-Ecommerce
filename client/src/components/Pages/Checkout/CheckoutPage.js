import React, { useState, useEffect, useContext, useRef } from 'react';
import { Form, Field } from 'react-final-form';
import { useMediaQuery } from 'react-responsive';
import { useNavigate, Outlet } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import _ from 'lodash';

import StripeCheckout from './StripeApi/StripeCheckout';
import { AppContext } from '../../../Contexts/AppContext';
import * as API from '../../../API/api';
import ImageRender from '../../reusables/ImageRender';
import {
  formatNumber,
  cartCalc,
  getUser,
  useValidate,
  imageTransform,
} from '../../../helper';
import * as config from '../../../config';

const stripePromise = loadStripe(config.STRIPE_KEY);

const CheckoutPage = () => {
  const products = JSON.parse(localStorage.getItem('cartItems')) || [];
  const { setShowSuccessModal, setShowMessage } = useContext(AppContext);
  const [currentUser, setCurrentUser] = useState({});
  const [stripeClientKey, setStripeClientKey] = useState('');
  const [stripeErrorMessage, setStripeErrorMessage] = useState(null);
  const [total, grandTotal, vat, shippingCost] = cartCalc(products);
  const [validateField, buttonValidation, paymentMethod] = useValidate();

  const stripeRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { loggedUser } = await getUser();

      setCurrentUser(loggedUser);
    })();
  }, []);

  const visaHandle = async formData => {
    const saleData = {
      products: products,
      total: grandTotal,
      user: currentUser?.id,
      paymentMethod: 'card',
      client: {
        name: formData.name,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        country: formData.country,
        zipCode: formData.zipCode,
        number: formData.number,
      },
    };

    API.getSecret(saleData, setStripeClientKey);
  };

  const handleSubmit = formData => {
    const saleData = {
      products: products,
      total: grandTotal,
      user: currentUser?.id,
      paymentMethod: formData.paymentMethod,
      client: {
        name: formData.name,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        country: formData.country,
        zipCode: formData.zipCode,
        number: formData.number,
      },
    };

    if (formData.paymentMethod === 'card') {
      stripeRef.current.handleSubmit();

      if (stripeErrorMessage) return;
      //
    } else {
      API.newSale(saleData, setShowMessage, setShowSuccessModal, navigate);
    }
  };

  const deskView = useMediaQuery({ minWidth: 1280 });
  const tabletView = useMediaQuery({ minWidth: 501, maxWidth: 1279 });
  const smallView = useMediaQuery({ maxWidth: 500 });

  const stripeOptions = {
    clientSecret: stripeClientKey,
    appearance: {
      theme: 'stripe',

      variables: {
        colorPrimary: '#D87D4A',
        colorText: '#000000',
        fontFamily: 'Manrope, sans-serif',
      },
    },
  };

  return (
    <section className='w-full bg-gray pb-24 pt-16 mobile:pt-6'>
      <Outlet />

      <div className='container mb-8 '>
        <p
          onClick={() => navigate(-1)}
          className='w-20 font-bold opacity-60 hover:text-primary cursor-pointer'
        >
          Go Back
        </p>
      </div>
      <Form
        initialValues={{
          name: _.isEmpty(currentUser) ? '' : currentUser.name,
          email: _.isEmpty(currentUser) ? '' : currentUser.email,
          address: _.isEmpty(currentUser.address) ? '' : currentUser.address.street,
          zipCode: _.isEmpty(currentUser?.address)
            ? ''
            : `${currentUser.address.zipCode}`,
          city: _.isEmpty(currentUser?.address) ? '' : currentUser.address.city,
          country: _.isEmpty(currentUser?.address)
            ? ''
            : currentUser.address.country,
        }}
        validateOnBlur
        onSubmit={handleSubmit}
      >
        {({ values, handleSubmit, valid }) => (
          <form onSubmit={handleSubmit}>
            <div className='container flex justify-between tablet:flex-col mobile:flex-col'>
              <div className='w-2/3 bg-white mr-4 p-8 rounded-md tablet:w-full tablet:mb-6 mobile:w-full mobile:mb-8'>
                <div className='mb-10 '>
                  <h2 className='uppercase'>checkout</h2>
                </div>
                <div className='mb-12'>
                  <div className='mb-4'>
                    <p className='checkoutSectionTitle'>billing details</p>
                  </div>

                  <div className='flex justify-between'>
                    <div className='w-full'>
                      <div className='flex justify-between mobile:flex-col mobile:mb-4'>
                        <div className='w-full mb-4 mr-4'>
                          <div className='flex justify-between '>
                            <p
                              className={`checkoutLabel ${
                                !validateField('name', values.name) && 'text-red-500'
                              }`}
                            >
                              Name
                            </p>
                            <span className='text-red-500'>
                              {!validateField('name', values.name) &&
                                'Minimum 6 characters'}
                            </span>
                          </div>
                          <Field
                            name='name'
                            type='text'
                            component='input'
                            validate={value => {
                              if (!validateField('name', values.name)) return true;
                            }}
                            className={`checkoutInputField ${
                              !validateField('name', values.name) &&
                              'border-2 border-red-500'
                            }`}
                            placeholder='Alexel Ward'
                          />
                        </div>

                        <div className='w-full'>
                          <div className='flex justify-between '>
                            <p
                              className={`checkoutLabel ${
                                !validateField('email', values.email) &&
                                'text-red-500'
                              }`}
                            >
                              Email Address
                            </p>
                            <span className='text-red-500'>
                              {!validateField('email', values.email) &&
                                'Wrong format'}
                            </span>
                          </div>
                          <Field
                            name='email'
                            type='email'
                            component='input'
                            validate={() => {
                              if (!validateField('email', values.email)) return true;
                            }}
                            className={`checkoutInputField ${
                              !validateField('email', values.email) &&
                              'border-2 border-red-500'
                            }`}
                            placeholder='alexei@mail.com'
                          />
                        </div>
                      </div>

                      <div className='flex justify-between mobile:flex-col'>
                        <div className='w-full mr-4'>
                          <div className='flex justify-between '>
                            <p
                              className={`checkoutLabel ${
                                validateField('number', values.number) &&
                                'text-red-500'
                              }`}
                            >
                              Number
                            </p>
                            <span className='text-red-500'>
                              {validateField('number', values.number) &&
                                'Wrong format'}
                            </span>
                          </div>
                          <Field
                            name='number'
                            component='input'
                            placeholder='+1 202-555-0136'
                            validate={value => {
                              if (validateField('number', values.number))
                                return true;
                            }}
                            className={`checkoutInputField ${
                              validateField('number', values.number) &&
                              'border-2 border-red-500'
                            }`}
                          />
                        </div>
                        <div className='w-full'></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='mb-12'>
                  <div className='mb-4'>
                    <p className='checkoutSectionTitle'>shipping info</p>
                  </div>

                  <div className='w-full mb-4'>
                    <p className='checkoutLabel'>Address</p>
                    <Field
                      name='address'
                      type='text'
                      component='input'
                      className='checkoutInputField'
                      placeholder='1137 Williams Avenue'
                    />
                  </div>

                  <div className='flex justify-between mobile:flex-col'>
                    <div className='w-full mr-4 mobile:mb-4'>
                      <div className='w-full mb-4'>
                        <div className='flex justify-between '>
                          <p
                            className={`checkoutLabel ${
                              !validateField('zipCode', values.zipCode) &&
                              'text-red-500'
                            }`}
                          >
                            ZIP Code
                          </p>
                          <span className='text-red-500'>
                            {!validateField('zipCode', values.zipCode) &&
                              'Wrong format'}
                          </span>
                        </div>
                        <Field
                          name='zipCode'
                          component='input'
                          validate={() => {
                            if (!validateField('zipCode', values.zipCode))
                              return true;
                          }}
                          className={`checkoutInputField ${
                            !validateField('zipCode', values.zipCode) &&
                            'border-2 border-red-500'
                          }`}
                          placeholder='10001'
                        />
                      </div>

                      <div className='w-full'>
                        <p className='checkoutLabel'>Country</p>
                        <Field
                          name='country'
                          type='text'
                          component='input'
                          placeholder='United States'
                          className='checkoutInputField'
                        />
                      </div>
                    </div>

                    <div className='w-full'>
                      <p className='checkoutLabel'>City</p>
                      <Field
                        name='city'
                        type='text'
                        component='input'
                        className='checkoutInputField'
                        placeholder='New York'
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className='mb-4 mobile:mb-6'>
                    <p className='checkoutSectionTitle'>payment details</p>
                  </div>

                  <div className='flex mb-6 mobile:flex-col'>
                    <div className='w-full mr-4 mobile:mb-4'>
                      <p className='checkoutLabel'>Payment Method</p>
                    </div>

                    <div className='w-full flex flex-col'>
                      {paymentMethod(valid, values) ? (
                        <>
                          <label className='checkoutInputField font-bold mb-4'>
                            <Field
                              name='paymentMethod'
                              type='radio'
                              component='input'
                              value='eMoney'
                              placeholder='hey'
                              className='appearance-none mr-4 ml-2 w-2 h-2 rounded-full  ring-2 ring-gray-200 ring-offset-2 checked:bg-primary cursor-pointer'
                            />
                            e-Money
                          </label>

                          <div className='checkoutInputField mb-4'>
                            <Field
                              name='paymentMethod'
                              type='radio'
                              component='input'
                              value='cashOnDelivery'
                              className='appearance-none mr-4 ml-2 w-2 h-2 rounded-full  ring-2 ring-gray-200 ring-offset-2 checked:bg-primary cursor-pointer'
                            />
                            <label className='font-bold'>Cash on Delivery</label>
                          </div>

                          <div className='checkoutInputField flex items-center'>
                            <Field
                              name='paymentMethod'
                              type='radio'
                              component='input'
                              value='card'
                              onClick={() => visaHandle(values)}
                              className='appearance-none mr-4 ml-2 w-2 h-2 rounded-full  ring-2 ring-gray-200 ring-offset-2 checked:bg-primary cursor-pointer'
                            />
                            <ImageRender
                              url='shared/desktop'
                              path='visa.png'
                              transform={{ width: '40px', height: '27px' }}
                            />
                          </div>
                        </>
                      ) : (
                        <div>
                          <p>
                            Please fill all the information to choose a "Payment
                            Method".
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {values?.paymentMethod === 'eMoney' && (
                    <div className='flex mobile:flex-col'>
                      <div className='w-full mr-4 mobile:mb-4'>
                        <p className='checkoutLabel'>e-Money Number</p>
                        <Field
                          name='eMoneyNumber'
                          component='input'
                          className='checkoutInputField'
                          placeholder='238521993'
                        />
                      </div>

                      <div className='w-full'>
                        <p className='checkoutLabel'>e-Money Pin</p>
                        <Field
                          name='eMoneyPin'
                          component='input'
                          className='checkoutInputField'
                          placeholder='6891'
                        />
                      </div>
                    </div>
                  )}
                  {values?.paymentMethod === 'cashOnDelivery' && (
                    <div className='flex items-center mobile:flex-col'>
                      <div className='mr-6 mobile:hidden'>
                        <ImageRender
                          url='shared/desktop'
                          path='cashOnDelivery.png'
                          transform={{ width: '100px' }}
                        />
                      </div>
                      <p className='opacity-70 pr-6 mobile:pr-0'>
                        The "Cash on Delivery" option enables you to pay in cash when
                        our delivery courier arrives at your residence. Just make
                        sure your address is correct so that your order will not be
                        cancelled.
                      </p>
                    </div>
                  )}

                  {values?.paymentMethod === 'card' && stripeClientKey && (
                    <Elements stripe={stripePromise} options={stripeOptions}>
                      <StripeCheckout
                        ref={stripeRef}
                        setStripeErrorMessage={setStripeErrorMessage}
                      />
                    </Elements>
                  )}
                </div>
              </div>

              <div className='w-1/3 bg-white rounded-md p-6 tablet:w-full mobile:w-full'>
                <div className='mb-8'>
                  <h5 className='uppercase'>summary</h5>
                </div>
                <div>
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
                              transform={imageTransform(
                                deskView,
                                tabletView,
                                smallView
                              )}
                            />
                          </div>

                          <div className='flex flex-col mr-16 ml-4 justify-center mobile:min-w-3/4 mobile:ml-0'>
                            <span className='font-bold text-lg mobile:text-md'>
                              {product.name.startsWith('XX99')
                                ? product.name
                                    .split('Headphones')[0]
                                    .replace('Mark', 'MK')
                                : product.name.split(' ')[0]}
                            </span>
                            <span className='text-gray-500 font-bold'>
                              {`$ ${formatNumber(product.price)}`}
                            </span>
                          </div>
                        </div>

                        <div className=''>
                          <p className='font-bold text-gray-500'>
                            x{product.quantity}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className='px-16 mb-8 uppercase font-bold mobile:px-8'>
                      <p>your cart is empty</p>
                    </div>
                  )}
                </div>
                <div className='mb-8'>
                  <div className='w-full mb-2 flex justify-between'>
                    <p className='uppercase text-gray-400'>total</p>
                    <p className='uppercase font-bold text-lg'>
                      $ {formatNumber(total)}
                    </p>
                  </div>
                  <div className='w-full mb-2 flex justify-between'>
                    <p className='uppercase text-gray-400'>shipping</p>
                    <p className='uppercase font-bold text-lg'>
                      $ {formatNumber(shippingCost)}
                    </p>
                  </div>
                  <div className='w-full mb-6 flex justify-between'>
                    <p className='uppercase text-gray-400'>vat (included)</p>
                    <p className='uppercase font-bold text-lg'>
                      $ {formatNumber(Math.round(vat))}
                    </p>
                  </div>
                  <div className='w-full flex justify-between'>
                    <p className='uppercase text-gray-400'>grand total</p>
                    <p className='uppercase font-bold text-lg text-primary'>
                      $ {formatNumber(grandTotal)}
                    </p>
                  </div>
                </div>

                <div className='w-full'>
                  {buttonValidation(valid, values) ? (
                    <button
                      type='submit'
                      className='w-full bg-primary text-white py-2 uppercase hover:bg-primary-light'
                    >
                      continue & pay
                    </button>
                  ) : (
                    <button
                      disabled
                      type='submit'
                      className='w-full bg-primary text-white py-2 uppercase hover:bg-primary-light disabled:opacity-50 disabled:bg-primary-light disabled:cursor-not-allowed'
                    >
                      continue & pay
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        )}
      </Form>
    </section>
  );
};

export default CheckoutPage;
