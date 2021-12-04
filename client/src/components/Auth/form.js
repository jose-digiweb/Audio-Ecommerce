import React from 'react';
import { Form, Field } from 'react-final-form';
import { Link } from 'react-router-dom';

import Button from '../reusables/Button';
import ImageRender from '../reusables/ImageRender';

const LogInForm = ({ onSubmit, isSignUp, setIsSignUp }) => {
  return (
    <div className='w-1/2 px-20 flex flex-col justify-center tablet:w-full'>
      <Link to='/'>
        <div className='flex items-center'>
          <ImageRender url='shared/desktop' path='arrow.svg' />
          <p className='ml-2 font-bold text-white hover:text-primary tracking-widest'>
            Back
          </p>
        </div>
      </Link>

      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form className='pt-10 max-w-md' onSubmit={handleSubmit}>
            <h2 className='mb-14 text-white'>{isSignUp ? 'Sign In' : 'Sign Up'}</h2>

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

            <Button
              styles='btn-primary rounded'
              text={isSignUp ? 'Sign In' : 'Sign Up'}
              type='submit'
            />

            <div className='pt-10 text-white'>
              {isSignUp ? 'Not registered yet? ' : 'Already have an account? '}
              <button
                type='button'
                onClick={() => setIsSignUp(prev => !prev)}
                className=' text-primary font-bold hover:text-primary-light'
              >
                {isSignUp ? 'Sign Up here!' : 'Sign In here!'}
              </button>
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default LogInForm;
