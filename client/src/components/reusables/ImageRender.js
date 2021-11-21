import React from 'react';
import { IKImage } from 'imagekitio-react';

const ImageRender = ({ url, path, transform }) => {
  return (
    <IKImage
      urlEndpoint={`https://ik.imagekit.io/beevfgcytiq/Audiophile/${url}`}
      path={path}
      transformation={[transform]}
    />
  );
};

export default ImageRender;
