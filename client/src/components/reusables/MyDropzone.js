import React from 'react';
import { useDropzone } from 'react-dropzone';
import galleryUpload from '../Dashboard/reusable/galleryUpload';

const MyDropzone = props => {
  const onDrop = files => {
    galleryUpload(files, props.fileName, props?.setGalleryImageData);
    props.onChange(files);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
    maxFiles: 4,
  });

  return (
    <>
      <div className={props.styles} {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop images here...</p>
        ) : (
          <div className='flex flex-col items-center'>
            <p>{props.textUp}</p>
            <p className='opacity-50'>{props.textDown}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default MyDropzone;
