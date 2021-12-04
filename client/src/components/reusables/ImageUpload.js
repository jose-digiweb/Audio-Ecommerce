import React from 'react';
import { IKContext, IKUpload } from 'imagekitio-react';

const ImageUpload = ({
  folderPath,
  fileName,
  coverImageData,
  setPicData,
  picData,
}) => {
  const publicKey = 'public_BDqyaCrCNBcot/R+VnBaqtaWw8o=';
  let urlEndpoint = 'https://ik.imagekit.io/beevfgcytiq/';
  const authenticationEndpoint =
    'https://audiophille.herokuapp.com/api/v1/products/images';

  const onSuccess = res => {
    console.log(res);

    if (folderPath.startsWith('products')) {
      coverImageData(res);
    } else if (folderPath.startsWith('users')) {
      picData.push({ picName: res.name, picId: res.fileId });
      setPicData(picData);
    }
  };

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
        onError={err => console.log(err)}
        onSuccess={onSuccess}
        accept='image/*'
      />
    </IKContext>
  );
};

export default ImageUpload;
