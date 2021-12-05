import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';

import ImageUpload from '../../reusables/ImageUpload';
import ImageRender from '../../reusables/ImageRender';
import MyDropzone from '../../reusables/MyDropzone';

import { editProductAction } from '../../../Redux/actions/productAction';
import ShowMessage from '../../reusables/ShowMessage';
import { MESSAGE_START, MESSAGE_SUCCESS, MESSAGE_ERROR } from '../../../config';

const EditProduct = ({ curProduct, editProductAction }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState({});

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
    editProductAction(
      curProduct?._id,
      formData,
      curProduct,
      Navigate,
      handleMessage
    );
  };

  if (!curProduct)
    return (
      <div className='h-full text-white flex justify-center items-center'>
        <h5 className='bg-primary px-6 py-4 rounded-md shadow-lg'>
          Please select a product from the Products List!
        </h5>
      </div>
    );
  return (
    <div className='flex container-tv h-screen justify-center items-center'>
      {showMessage ? (
        <ShowMessage message={message?.text} color={message.color} />
      ) : null}
      <div className='w-full h-screen py-10 pr-8 max-w-3xl overflow-y-scroll scrollbar-thin scrollbar-thumb-primary'>
        <Form
          onSubmit={handleSubmit}
          mutators={{ ...arrayMutators }}
          validateOnBlur={true}
          initialValues={{
            includes: curProduct?.includes || [{ item: '', quantity: '' }],
            name: curProduct?.name,
            description: curProduct?.description,
            features: curProduct?.features,
            price: curProduct?.price,
            category: curProduct?.category,
          }}
          render={({
            handleSubmit,

            form: {
              mutators: { push, pop },
            },
            pristine,
            form,
            submitting,

            values,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className='mb-8 pb-2'>
                <h2 className='text-white shadow py-2 pl-2'>Edit Product</h2>
              </div>

              <div className='flex flex-col mb-4'>
                <label htmlFor='name' className='text-white font-bold mb-1'>
                  Name
                </label>
                <Field
                  id='name'
                  className='py-2 pl-4 rounded-md'
                  name='name'
                  component='input'
                  placeholder='Product Name'
                />
              </div>

              <div className='flex justify-between'>
                <div className='flex w-full flex-col mb-4'>
                  <label htmlFor='description' className='text-white font-bold mb-1'>
                    Description
                  </label>
                  <Field
                    id='description'
                    className='w-auto mr-8 py-2 pl-4 rounded-md'
                    name='description'
                    component='textarea'
                    placeholder='Description'
                  />
                </div>

                <div className='flex w-full flex-col mb-4'>
                  <label htmlFor='features' className='text-white font-bold mb-1'>
                    Features
                  </label>
                  <Field
                    id='features'
                    className='w-auto py-2 pl-4 rounded-md'
                    name='features'
                    component='textarea'
                    placeholder='Features'
                  />
                </div>
              </div>

              <div className='flex mb-1 justify-between'>
                <div className='w-50 flex flex-col mb-4'>
                  <label htmlFor='price' className='text-white font-bold mb-1'>
                    Price
                  </label>
                  <Field
                    id='price'
                    className={`mr-8 py-2 pl-4 rounded-md ${
                      isNaN(values.price) ? 'border-2 border-red-600' : ''
                    }`}
                    name='price'
                    component='input'
                    placeholder='Price'
                    onBlur={() => {
                      isNaN(values.price);
                    }}
                  />
                  <p className='py-2 font-bold text-red-500'>
                    {isNaN(values.price) ? 'Price must be a number' : ''}
                  </p>
                </div>

                <div className='w-auto flex flex-col mb-4 mr-6'>
                  <label htmlFor='category' className='text-white font-bold mb-1'>
                    Category
                  </label>
                  <Field
                    id='category'
                    className='py-2 pl-2 pr-4 rounded-md cursor-pointer'
                    name='category'
                    component='select'
                  >
                    <option>- - -</option>
                    <option value='headphones'>headphones</option>
                    <option value='earphones'>earphones</option>
                    <option value='speakers'>speakers</option>
                  </Field>
                </div>

                <div className='w-50 flex flex-col mb-4'>
                  <label htmlFor='coverImage' className='text-white font-bold mb-1'>
                    Cover Image
                  </label>
                  <ImageUpload
                    id='coverImage'
                    folderPath={`products/${values.name?.split(' ').join('-')}`}
                    formData={values}
                  />
                </div>
              </div>

              <div className='w-50  flex flex-col mb-6'>
                <label htmlFor='images' className='text-white font-bold mb-1'>
                  Gallery Images
                </label>
                <Field id='images' name='images'>
                  {props => (
                    <MyDropzone
                      {...props.input}
                      styles='bg-gray-100 py-1 px-2 border-2 border-gray-300 border-dashed hover:bg-white cursor-pointer rounded-lg'
                      textUp='Drop Images or Click'
                      textDown='jpg/png'
                      formData={values}
                    />
                  )}
                </Field>
              </div>

              <div className='mb-10 max-h-60 scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray overflow-y-scroll'>
                <h5 className='text-white font-bold mb-4'>
                  What is included in the box?
                </h5>
                <FieldArray name='includes'>
                  {({ fields }) =>
                    fields.map((name, index) => (
                      <div key={name} className='w-auto flex flex-col mb-4 mr-6'>
                        <div className='flex items-center'>
                          <div className='flex flex-col'>
                            <label
                              htmlFor='itemName'
                              className='text-white font-bold mb-1'
                            >
                              Item name
                            </label>
                            <Field
                              id='itemName'
                              className='mr-8 py-2 pl-4 rounded-md'
                              name={`${name}.item`}
                              component='input'
                              placeholder='Name of the item'
                            />
                          </div>
                          <div className='flex flex-col'>
                            <label
                              htmlFor='quantity'
                              className='text-white font-bold mb-1'
                            >
                              Quantity
                            </label>
                            <Field
                              id='quantity'
                              className='mr-8 py-2 pl-4 rounded-md'
                              name={`${name}.quantity`}
                              component='input'
                              placeholder='Quantity'
                            />
                          </div>
                          <div
                            aria-label='remove field'
                            onClick={() => fields.remove(index)}
                            className='flex px-4 place-self-end cursor-pointer '
                          >
                            <div className='rounded-full bg-red-500  hover:bg-red-700'>
                              <ImageRender
                                url='dashboard/icons'
                                path='minusWhite.svg'
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </FieldArray>

                <button
                  aria-label='add field'
                  type='button'
                  className='flex items-center bg-green-500 text-white pl-2 pr-4 py-1 rounded-md'
                  onClick={() => push('includes', undefined)}
                >
                  <ImageRender url='dashboard/icons' path='plusWhite.svg' /> Add
                  Field
                </button>
              </div>

              <button
                aria-label='submit form'
                type='submit'
                className='btn-primary px-10 shadow-md hover:shadow-inner hover:bg-primary rounded-lg'
              >
                Submit
              </button>
            </form>
          )}
        />
      </div>
    </div>
  );
};

export default connect(null, { editProductAction })(EditProduct);
