import React from 'react';

import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';

import ImageUpload from '../../reusables/ImageUpload';
import ImageRender from '../../reusables/ImageRender';
import { createProductAction } from '../../../Redux/actions/productAction';
import MyDropzone from '../../reusables/MyDropzone';
import ShowMessage from '../../reusables/ShowMessage';
import { MESSAGE_START, MESSAGE_SUCCESS, MESSAGE_ERROR } from '../../../config';

class CreateProduct extends React.Component {
  state = {
    showMessage: false,
    reRender: false,
    message: {},
    coverImageData: {},
    galleryImageData: [],
  };

  shouldComponentUpdate() {
    return this.state.reRender;
  }

  componentDidUpdate() {
    this.setState({ reRender: false });
  }

  handleMessage = (message, color) => {
    this.setState({ message: { text: message, color: color } });

    setTimeout(() => {
      this.setState({ reRender: true });
      this.setState({ showMessage: true });

      setTimeout(() => {
        this.setState({ reRender: true });
        this.setState({ showMessage: false });
      }, `${color === 'red' ? MESSAGE_ERROR : MESSAGE_SUCCESS}`);
    }, MESSAGE_START);
  };

  setCoverImageData = result => {
    this.setState({
      coverImageData: { imageName: result.name, imageId: result.fileId },
    });
  };
  setGalleryImageData = result => {
    this.setState({ galleryImageData: result });
  };

  handleSubmit = async formData => {
    const productData = {
      name: formData.name,
      description: formData.description,
      features: formData.features,
      price: formData.price,
      category: formData.category,
      coverImage: this.state.coverImageData,
      images: this.state.galleryImageData,
      includes: formData.includes,
    };

    this.props.createProductAction(productData, this.handleMessage);
  };

  render() {
    return (
      <div className='flex container-tv h-screen justify-center items-center'>
        {this.state.showMessage ? (
          <ShowMessage
            message={this.state.message?.text}
            color={this.state.message?.color}
          />
        ) : null}
        <div className='w-full h-screen py-10 pr-8 max-w-3xl overflow-y-scroll scrollbar-thin scrollbar-thumb-primary'>
          <Form
            onSubmit={this.handleSubmit}
            mutators={{ ...arrayMutators }}
            initialValues={{
              includes: [{ item: '', quantity: '' }],
            }}
            render={({
              handleSubmit,
              form: {
                mutators: { push, pop },
              },
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className='mb-8 pb-2'>
                  <h2 className='text-white shadow py-2 pl-2'>Create Product</h2>
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
                    <label
                      htmlFor='description'
                      className='text-white font-bold mb-1'
                    >
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
                      className='mr-8 py-2 pl-4 rounded-md'
                      name='price'
                      component='input'
                      placeholder='Price'
                    />
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
                    <label
                      htmlFor='coverImage'
                      className='text-white font-bold mb-1'
                    >
                      Cover Image
                    </label>
                    <ImageUpload
                      id='coverImage'
                      fileName={`${values.name}-coverImage`}
                      folderPath={`products/${values.name?.split(' ').join('-')}`}
                      coverImageData={this.setCoverImageData}
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
                        fileName={values.name}
                        setGalleryImageData={this.setGalleryImageData}
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
                    <ImageRender url='dashboard/icons' path='plusWhite.svg' />
                    Add Field
                  </button>
                </div>

                <button
                  aria-label='submit form'
                  type='submit'
                  className='btn-primary px-10 shadow-md hover:shadow-inner hover:bg-primary rounded-lg'
                >
                  Create
                </button>
              </form>
            )}
          />
        </div>
      </div>
    );
  }
}

export default connect(null, { createProductAction })(CreateProduct);
