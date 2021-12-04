import React from 'react';
import { Field } from 'react-final-form';

const FormField = ({ label, name, type, component, placeholder, fieldName }) => {
  return (
    <div className='flex flex-col pb-4'>
      <label className='checkoutLabel text-white ' htmlFor={name}>
        {label}
      </label>
      <Field
        className={`checkoutInputField`}
        name={name}
        id={name}
        type={type}
        component={component}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormField;
