import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import * as API from '../../../API/api';
import { AppContext } from '../../../Contexts/AppContext';

const ForgotPassword = ({ showResetPassword, setShowResetPassword }) => {
  const { setShowMessage } = useContext(AppContext);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const handleForgetPassword = e => {
    e.preventDefault();

    API.forgotPassword(email, setEmail, setShowMessage, setShowSuccessMessage);

    setTimeout(() => navigate('/'), 15000);
  };

  return (
    <div
      onClick={() => setShowResetPassword(false)}
      className={`${
        showResetPassword
          ? 'w-full h-screen bg-black bg-opacity-80 absolute flex items-center justify-center top-0 left-0 mobile:px-4'
          : 'hidden'
      }`}
    >
      <div
        onClick={e => e.stopPropagation()}
        className='w-1/2 h-auto bg-gray shadow p-10 rounded mobile:w-full mobile:p-6'
      >
        <div className='mb-8'>
          <h5 className='mb-6'>Reset your password</h5>
          <p>
            To reset your password, enter your email below and submit.
            <br /> An email will be sent to you with instructions about how to
            complete the process.
          </p>
        </div>
        <form>
          <div className='flex flex-col mb-4'>
            <label htmlFor='email' className='checkoutLabel'>
              Email Address
            </label>
            <input
              onChange={e => setEmail(e.target.value)}
              value={email}
              type='email'
              placeholder='Insert your email address...'
              id='email'
              className='checkoutInputField'
            />
          </div>

          <div>
            <button onClick={handleForgetPassword} className='btn-primary rounded'>
              Submit
            </button>
          </div>
        </form>

        {showSuccessMessage && (
          <div className='w-full bg-green-600 text-white p-4 mt-10 rounded shadow-inner'>
            <p>
              We've just sent you an email with the instructions.
              <br /> Please check your inbox.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
