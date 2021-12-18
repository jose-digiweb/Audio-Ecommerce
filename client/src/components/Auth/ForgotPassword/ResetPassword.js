import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { useParams } from 'react-router-dom';

import * as API from '../../../API/api';
import ForbiddenPage from '../../reusables/ForbiddenPage';
import Spinner from '../../reusables/Spinner';
import { AppContext } from '../../../Contexts/AppContext';

const ResetPassword = () => {
  const { setShowMessage } = useContext(AppContext);
  const [initialValues, setInitialValues] = useState({});
  const [allowed, setAllowed] = useState(null);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    API.resetPassword(params.token, setAllowed);
  }, [params.token]);

  const handleSubmit = async formData => {
    const data = {
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
      token: params.token,
    };

    await API.newPassword(data, setShowMessage, navigate);

    setInitialValues({
      newPassword: '',
      confirmPassword: '',
    });
  };

  if (allowed === null) <Spinner />;
  if (
    allowed?.status === 500 ||
    allowed?.status === 404 ||
    allowed?.status === 403
  ) {
    return <ForbiddenPage text={allowed.message} />;
  }

  return (
    <div
      className={`${
        allowed?.status === 200
          ? 'w-full h-screen bg-black bg-pattern-circle bg-no-repeat bg-center flex items-center justify-center absolute top-0 left-0 mobile:px-4'
          : 'hidden'
      }`}
    >
      <div className='w-1/2 p-10 bg-gray shadow mobile:w-full rounded'>
        <Form
          initialValues={initialValues}
          onSubmit={handleSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className='flex flex-col mb-4'>
                <label htmlFor='newPassword' className='checkoutLabel'>
                  New Password
                </label>
                <Field
                  id='newPassword'
                  label='New Password'
                  name='newPassword'
                  type='password'
                  component='input'
                  placeholder='New Password'
                  className='checkoutInputField'
                />
              </div>

              <div className='flex flex-col mb-4'>
                <label htmlFor='confirmPassword' className='checkoutLabel'>
                  Confirm Password{' '}
                </label>
                <Field
                  id='confirmPassword'
                  label='Confirm Password'
                  name='confirmPassword'
                  type='password'
                  component='input'
                  placeholder='Confirm Password'
                  className='checkoutInputField'
                />
              </div>

              <div>
                <button type='submit' className='btn-primary rounded'>
                  Submit
                </button>
              </div>
            </form>
          )}
        />
      </div>
    </div>
  );
};

export default ResetPassword;
