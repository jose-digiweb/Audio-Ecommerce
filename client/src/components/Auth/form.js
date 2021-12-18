import React from 'react';
import { Form, Field } from 'react-final-form';
import { Link } from 'react-router-dom';

import Button from '../reusables/Button';
import ImageRender from '../reusables/ImageRender';

const LogInForm = ({ onSubmit, isSignUp, setIsSignUp, setShowResetPassword }) => {
  return (
    <div className='w-1/2 px-20 flex flex-col justify-center mobile:w-full mobile:h-full mobile:px-0 tablet:w-full'>
      <Link to='/'>
        <div className='flex items-center'>
          <ImageRender url='shared/desktop' path='arrowLeft.svg' />

          <p className='ml-2 font-bold text-white hover:text-primary tracking-widest mobile:font-body'>
            Back
          </p>
        </div>
      </Link>

      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form
            className='pt-6 max-w-md mobile:pt-4 mobile:h-full'
            onSubmit={handleSubmit}
          >
            <p className='mb-8 font-bold text-2xl text-white mobile:mb-6'>
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </p>

            {!isSignUp ? (
              <div className='flex'>
                <div className='flex flex-col mb-6 mr-4'>
                  <label className='checkoutLabel text-white flex flex-col'>
                    First Name
                  </label>
                  <Field
                    type='text'
                    name='firstName'
                    placeholder='First Name'
                    component='input'
                    className='checkoutInputField'
                  />
                </div>

                <div className='flex flex-col mb-6'>
                  <label className='checkoutLabel text-white flex flex-col'>
                    Last Name
                  </label>
                  <Field
                    type='text'
                    name='lastName'
                    placeholder='Last Name'
                    component='input'
                    className='checkoutInputField'
                  />
                </div>
              </div>
            ) : null}

            <div className='flex flex-col mb-6'>
              <label className='checkoutLabel text-white flex flex-col'>Email</label>
              <Field
                type='email'
                name='email'
                placeholder='Email'
                component='input'
                className='checkoutInputField'
              />
            </div>

            <div className='flex flex-col mb-6'>
              <label className='checkoutLabel text-white flex flex-col'>
                Password
              </label>
              <Field
                type='password'
                name='password'
                placeholder='Password'
                component='input'
                className='checkoutInputField'
              />
            </div>
            {!isSignUp && (
              <div className='flex flex-col mb-6'>
                <label className='checkoutLabel text-white flex flex-col'>
                  Confirm Password
                </label>
                <Field
                  type='password'
                  name='confirmPassword'
                  placeholder='Confirm Password'
                  component='input'
                  className='checkoutInputField'
                />
              </div>
            )}

            <div className='flex items-center  mobile:items-start'>
              <Button
                styles='btn-primary mobile:w-full rounded mr-4'
                text={isSignUp ? 'Sign In' : 'Sign Up'}
                type='submit'
              />

              <div className='flex flex-col text-white mobile:ml-4'>
                <p>{isSignUp ? 'Not registered yet? ' : 'Already registered? '}</p>
                <span
                  onClick={() => setIsSignUp(prev => !prev)}
                  className=' text-primary font-bold hover:text-primary-light cursor-pointer'
                >
                  {isSignUp ? 'Sign Up here!' : 'Sign In here!'}
                </span>
              </div>
            </div>

            <div className='text-white mt-4'>
              {isSignUp && (
                <p className='text-sm tracking-wider'>
                  Forget your password?{' '}
                  <span
                    onClick={() => setShowResetPassword(true)}
                    className='font-body cursor-pointer text-primary hover:underline'
                  >
                    Click Here!
                  </span>
                </p>
              )}
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default LogInForm;
