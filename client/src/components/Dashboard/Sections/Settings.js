import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';

import { editUserAction } from '../../../Redux/actions/userAction';
import ImageUpload from '../../reusables/ImageUpload';

const Settings = ({
  editUserAction,
  currentUser,
  setReRender,
  setShowMessage,
  setMessage,
}) => {
  const [resetPassword, setResetPassword] = useState(false);

  const [picData, setPicData] = useState(``);
  const [initValues, setInitValues] = useState(null);

  const handleSubmit = formData => {
    const { id } = currentUser?.loggedUser;
    const userData = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      password: formData.password,
      actualPassword: formData.actualPassword,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
    };

    if (picData)
      userData.picture = [{ picName: picData?.name, picId: picData?.fileId }];

    editUserAction(id, userData, setShowMessage, setInitValues, setReRender);
  };

  const initialFormValues = {
    firstName: currentUser?.loggedUser.name.split(' ')[0],
    lastName: currentUser?.loggedUser.name.split(' ')[1],
    email: currentUser?.loggedUser.email,
    password: '',
    actualPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='w-2/4 h-full flex flex-col justify-center'>
        <div className='mb-8 pb-2'>
          <h2 className='text-white shadow py-2 px-4'>Account Settings</h2>
        </div>

        <Form
          onSubmit={handleSubmit}
          initialValues={initValues ? initValues : initialFormValues}
          render={({ handleSubmit, values, form }) => (
            <form onSubmit={handleSubmit}>
              <div className='mb-8 pb-2'>
                <h5 className='text-white py-2 border-b-2 '>
                  {resetPassword ? 'Reset Password' : 'Edit Personal Information'}
                </h5>
              </div>

              {resetPassword ? (
                <div className='flex flex-col mb-4'>
                  <label
                    htmlFor='actualPassword'
                    className='text-white font-bold mb-1'
                  >
                    Actual Password
                  </label>
                  <Field
                    className='py-2 pl-4 rounded-md shadow-md'
                    id='actualPassword'
                    name='actualPassword'
                    component='input'
                    type='password'
                    placeholder='Actual Password'
                  />
                </div>
              ) : (
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
              )}

              {resetPassword ? (
                <div className='flex flex-col mb-4'>
                  <label htmlFor='newPassword' className='text-white font-bold mb-1'>
                    New Password
                  </label>
                  <Field
                    className='py-2 pl-4 rounded-md shadow-md'
                    id='newPassword'
                    name='newPassword'
                    component='input'
                    type='password'
                    placeholder='New Password'
                  />
                </div>
              ) : (
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
              )}
              {resetPassword ? (
                <div className='flex flex-col mb-4'>
                  <label
                    htmlFor='confirmPassword'
                    className='text-white font-bold mb-1'
                  >
                    Confirm Password
                  </label>
                  <Field
                    className='py-2 pl-4 rounded-md shadow-md'
                    id='confirmPassword'
                    name='confirmPassword'
                    component='input'
                    type='password'
                    placeholder='Confirm Password'
                  />
                </div>
              ) : (
                <>
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
                      afterSubmit={() => form.reset()}
                    />
                  </div>

                  <div className='flex flex-col mb-4'>
                    <label
                      htmlFor='profilePicture'
                      className='text-white font-bold mb-1'
                    >
                      Upload Profile Picture
                    </label>
                    <ImageUpload
                      fileName={`${values.firstName}-${values.lastName}-${Math.floor(
                        Math.random() * 5
                      )}`}
                      folderPath={`users`}
                      setPicData={setPicData}
                    />
                  </div>
                </>
              )}

              <div className='flex items-center'>
                <button type='submit' className='btn-dash mt-6 mr-8'>
                  {resetPassword ? 'Reset Password' : 'Submit'}
                </button>

                <button
                  onClick={() => setResetPassword(prev => !prev)}
                  type='button'
                  className='text-white font-bold mt-6 border-b-2 hover:text-primary'
                >
                  {resetPassword ? 'Personal Details' : 'Reset Password'}
                </button>
              </div>
            </form>
          )}
        />
      </div>
    </div>
  );
};

export default connect(null, { editUserAction })(Settings);
