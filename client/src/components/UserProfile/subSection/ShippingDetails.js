import React, { useEffect, useState, useContext } from 'react';
import { Form } from 'react-final-form';
import { connect } from 'react-redux';

import { AppContext } from '../../../Contexts/AppContext';
import FormField from '../../reusables/FormField';
import { getUser } from '../../../helper';
import { updateMeAction } from '../../../Redux/actions/userAction';

const ShippingDetails = ({ updateMeAction }) => {
  const { isLogged, setIsLogged, setShowMessage } = useContext(AppContext);
  const [initialValues, setInitialValues] = useState(isLogged?.loggedUser?.address);

  useEffect(() => {
    (async () => {
      const { loggedUser } = await getUser();

      setInitialValues(loggedUser?.address);
    })();
  }, []);

  const handleSubmit = formData => {
    updateMeAction(
      isLogged.loggedUser.id,
      formData,
      setInitialValues,
      setShowMessage,
      setIsLogged
    );
  };

  return (
    <div className='w-full h-full flex flex-col items-center justify-center pt-24 pl-10 tablet:pl-0 tablet:justify-start mobile:pt-0 mobile:pl-0 mobile:justify-start'>
      <Form initialValues={initialValues} validateOnBlur onSubmit={handleSubmit}>
        {({ handleSubmit }) => (
          <form className='w-full flex justify-center' onSubmit={handleSubmit}>
            <div className='w-1/2 flex flex-col tablet:w-full mobile:w-full mobile:pb-6'>
              <h5 className='mb-6 text-white pb-2 border-b-2'>Shipping Address</h5>

              <FormField
                label='Address'
                name='street'
                type='text'
                component='input'
                placeholder='Address'
              />

              <FormField
                label='City'
                name='city'
                type='text'
                component='input'
                placeholder='City'
              />

              <FormField
                label='ZIP Code'
                name='zipCode'
                type='text'
                component='input'
                placeholder='ZIP Code'
              />

              <FormField
                label='Country'
                name='country'
                type='text'
                component='input'
                placeholder='Country'
              />

              <FormField
                label='Password'
                name='password'
                type='password'
                component='input'
                placeholder='Password'
              />

              <div className='w-full'>
                <button
                  className='w-full py-2 px-6 mt-2 text-white font-bold tracking-wider bg-primary hover:bg-opacity-70 rounded-md'
                  type='submit'
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        )}
      </Form>
    </div>
  );
};

export default connect(null, { updateMeAction })(ShippingDetails);
