import ImageKit from 'imagekit-javascript';

const galleryUpload = (images, name, setGalleryImageData) => {
  let folderName = name?.split(' ').join('-');

  const imagekit = new ImageKit({
    publicKey: 'public_BDqyaCrCNBcot/R+VnBaqtaWw8o=',
    urlEndpoint: `https://ik.imagekit.io/beevfgcytiq/`,
    authenticationEndpoint: 'http://localhost:3001/api/v1/products/images',
  });

  let imagesData = [];

  images?.forEach((image, i) => {
    imagekit.upload(
      {
        file: image,
        fileName: `${folderName}-gallery-${i}`,
        folder: `Audiophile/products/${folderName}`,
        useUniqueFileName: false,
      },
      (err, res) => {
        if (err) console.log(err);
        else {
          console.log(res);

          imagesData.push({
            imageName: res.name,
            imageId: res.fileId,
            width: res.width,
          });
          setGalleryImageData([...imagesData]);
        }
      }
    );
  });
};

export default galleryUpload;
