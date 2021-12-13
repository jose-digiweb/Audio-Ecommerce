import React, { useEffect, useState, useContext } from 'react';
import { Form } from 'react-final-form';
import { connect } from 'react-redux';

import { AppContext } from '../../../Contexts/AppContext';
import ImageUpload from '../../reusables/ImageUpload';
import FormField from '../../reusables/FormField';
import { getUser, setRenderMessage } from '../../../helper';
import { updateMeAction } from '../../../Redux/actions/userAction';

const ProfileSettings = ({ updateMeAction }) => {
  const { isLogged, setIsLogged, setShowMessage } = useContext(AppContext);
  const [initialValues, setInitialValues] = useState(isLogged?.loggedUser);
  const [picData, setPicData] = useState([isLogged?.loggedUser?.picture]);
  const [passwordReset, setPasswordReset] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    (async () => {
      const { loggedUser } = await getUser();

      setInitialValues(loggedUser);
    })();
  }, []);

  const onImageUploadError = ({ message }) => {
    setRenderMessage(setShowMessage, {
      text: `${message}. Please try again!`,
      color: 'red',
    });

    setTimeout(() => setDisableButton(false), 1500);
  };

  const onImageUploadSuccess = res => {
    picData.push({ picName: res.name, picId: res.fileId });
    setPicData(picData);

    setDisableButton(false);
  };

  const handleSubmit = Data => {
    let formData;

    Data?.newPassword
      ? (formData = {
          currentPassword: Data?.currentPassword,
          newPassword: Data?.newPassword,
          confirmPassword: Data?.confirmPassword,
        })
      : (formData = {
          name: Data?.name,
          email: Data?.email,
          password: Data?.password,
          picture: picData?.slice(-1)[0],
          disposalPics: picData,
        });

    updateMeAction(
      isLogged.loggedUser.id,
      formData,
      setInitialValues,
      setShowMessage,
      setIsLogged,
      setPicData
    );
  };

  return (
    <div className='w-full h-full flex flex-col items-center justify-center pt-24 pl-10 tablet:pl-0 tablet:justify-start mobile:pt-0 mobile:pl-0 mobile:justify-start'>
      <Form initialValues={initialValues} validateOnBlur onSubmit={handleSubmit}>
        {({ values, handleSubmit }) => (
          <form className='w-full flex justify-center' onSubmit={handleSubmit}>
            <div className='w-1/2 flex flex-col tablet:w-full mobile:w-full mobile:mb-6'>
              <h5 className='mb-4 text-white pb-2 border-b-2'>
                {passwordReset ? 'Reset Password' : 'Profile Settings'}
              </h5>

              <div className='flex mb-6'>
                <div
                  onClick={() => {
                    setPasswordReset(true);
                  }}
                  className='w-1/2 bg-gray-200 flex justify-center cursor-pointer mr-2 rounded shadow hover:shadow-inner hover:bg-gray-300'
                >
                  <p>Reset Password</p>
                </div>

                <div
                  onClick={() => {
                    setPasswordReset(false);
                  }}
                  className='w-1/2 bg-gray-200 flex justify-center cursor-pointer ml-2 rounded shadow hover:shadow-inner hover:bg-gray-300'
                >
                  <p>Personal Details</p>
                </div>
              </div>

              {!passwordReset ? (
                <div>
                  <FormField
                    label='Name'
                    name='name'
                    type='text'
                    component='input'
                    placeholder='Name'
                  />

                  <FormField
                    label='Email'
                    name='email'
                    type='text'
                    component='input'
                    placeholder='Email'
                  />

                  <div className='flex flex-col mb-4 '>
                    <label
                      htmlFor='profilePicture'
                      className='text-white font-bold mb-1'
                    >
                      Upload Profile Picture
                    </label>
                    <ImageUpload
                      fileName={`${values?.name?.split(' ')?.join('-')}${
                        Math.random() * 1000000
                      }`}
                      folderPath={`users`}
                      setPicData={setPicData}
                      picData={picData}
                      id='profilePicture'
                      onImageUploadError={onImageUploadError}
                      onImageUploadSuccess={onImageUploadSuccess}
                      setDisableButton={setDisableButton}
                    />
                  </div>

                  <FormField
                    label='Password'
                    name='password'
                    type='password'
                    component='input'
                    placeholder='Password'
                  />
                </div>
              ) : (
                <div>
                  <FormField
                    label='Current Password'
                    name='currentPassword'
                    type='password'
                    component='input'
                    placeholder='Current Password'
                  />

                  <FormField
                    label='New Password'
                    name='newPassword'
                    type='password'
                    component='input'
                    placeholder='New Password'
                  />

                  <FormField
                    label='Confirm Password'
                    name='confirmPassword'
                    type='password'
                    component='input'
                    placeholder='Confirm Password'
                  />
                </div>
              )}

              <div className='w-full'>
                <button
                  disabled={disableButton}
                  className='w-full py-2 px-6 mt-2 text-white font-bold tracking-wider bg-primary hover:bg-opacity-70 rounded-md disabled:opacity-50 disabled:cursor-wait'
                  type='submit'
                >
                  {disableButton ? 'Loading image...' : 'Submit'}
                </button>
              </div>
            </div>
          </form>
        )}
      </Form>
    </div>
  );
};

export default connect(null, { updateMeAction })(ProfileSettings);
