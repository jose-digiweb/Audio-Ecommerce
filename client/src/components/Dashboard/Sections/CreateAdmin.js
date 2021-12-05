import React, { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';

import ShowMessage from '../../reusables/ShowMessage';
import { signUpAdminAction } from '../../../Redux/actions/authAction';
import { MESSAGE_START, MESSAGE_SUCCESS, MESSAGE_ERROR } from '../../../config';

const CreateAdmin = ({ signUpAdminAction }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState({});
  const [initValues, setInitValues] = useState({});

  useEffect(() => {}, [showMessage]);

  const handleMessage = (text, color) => {
    setMessage({ text: text, color: color });

    setTimeout(() => {
      setShowMessage(prev => !prev);

      setTimeout(() => {
        setShowMessage(prev => !prev);
      }, `${color === 'red' ? MESSAGE_ERROR : MESSAGE_SUCCESS}`);
    }, MESSAGE_START);
  };

  const handleSubmit = formData => {
    signUpAdminAction(formData, handleMessage, setInitValues);
  };

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='w-2/4 h-full flex flex-col justify-center'>
        {showMessage ? (
          <ShowMessage message={message?.text} color={message?.color} />
        ) : null}
        <Form
          onSubmit={handleSubmit}
          initialValues={initValues}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className='mb-8 pb-2'>
                <h2 className='text-white shadow py-2 pl-2'>Assign Admin</h2>
              </div>

              <div className='flex justify-between'>
                <div className='flex flex-col w-1/2 mr-2 mb-4'>
                  <label htmlFor='firstName' className='text-white font-bold mb-1'>
                    First Name
                  </label>
                  <Field
                    className='py-2 pl-4 rounded-md shadow-md'
                    id='firstName'
                    name='firstName'
                    component='input'
                    type='text'
                    placeholder='First Name'
                  />
                </div>

                <div className='flex flex-col w-1/2 ml-2 mb-4'>
                  <label htmlFor='lastName' className='text-white font-bold mb-1'>
                    Last Name
                  </label>
                  <Field
                    className='py-2 pl-4 rounded-md shadow-md'
                    id='lastName'
                    name='lastName'
                    component='input'
                    type='text'
                    placeholder='Last Name'
                  />
                </div>
              </div>

              <div className='flex flex-col mb-4'>
                <label htmlFor='email' className='text-white font-bold mb-1'>
                  Email
                </label>
                <Field
                  className='py-2 pl-4 rounded-md shadow-md'
                  id='email'
                  name='email'
                  component='input'
                  type='email'
                  placeholder='email@example.com'
                />
              </div>
              <div className='flex flex-col mb-4'>
                <label htmlFor='password' className='text-white font-bold mb-1'>
                  Password
                </label>
                <Field
                  className='py-2 pl-4 rounded-md shadow-md'
                  id='password'
                  name='password'
                  component='input'
                  type='password'
                  placeholder='Create Password'
                />
              </div>
              <div className='flex flex-col mb-4'>
                <label
                  htmlFor='passwordConfirm'
                  className='text-white font-bold mb-1'
                >
                  Password Confirm
                </label>
                <Field
                  className='py-2 pl-4 rounded-md shadow-md'
                  id='passwordConfirm'
                  name='passwordConfirm'
                  component='input'
                  type='password'
                  placeholder='Confirm your password'
                />
              </div>

              <button type='submit' className='btn-dash mt-6'>
                Submit
              </button>
            </form>
          )}
        />
      </div>
    </div>
  );
};

export default connect(null, { signUpAdminAction })(CreateAdmin);
