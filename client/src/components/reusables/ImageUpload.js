import React from 'react';
import { IKContext, IKUpload } from 'imagekitio-react';

const ImageUpload = ({
  folderPath,
  fileName,
  coverImageData,
  onImageUploadError,
  onImageUploadSuccess,
  setDisableButton,
}) => {
  const publicKey = 'public_BDqyaCrCNBcot/R+VnBaqtaWw8o=';
  let urlEndpoint = 'https://ik.imagekit.io/beevfgcytiq/';
  const authenticationEndpoint =
    'https://audiophille.herokuapp.com/api/v1/products/images';

  return (
    <IKContext
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticationEndpoint={authenticationEndpoint}
      overwriteFile={true}
    >
      <IKUpload
        className='bg-white py-1 pl-1 rounded-md'
        fileName={fileName}
        folder={`Audiophile/${folderPath}`}
        useUniqueFileName={false}
        isPrivateFile={false}
        onError={onImageUploadError}
        onSuccess={onImageUploadSuccess}
        accept='image/*'
        onChange={() => setDisableButton(true)}
      />
    </IKContext>
  );
};

export default ImageUpload;
