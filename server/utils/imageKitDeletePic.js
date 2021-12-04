import ImageKit from 'imagekit';

const deleteOldPicture = (currentPicId, newPicId, disposalPics) => {
  if (currentPicId === newPicId) return;

  disposalPics = disposalPics.filter(pic => pic.picId !== newPicId);

  const imageKit = new ImageKit({
    publicKey: 'public_BDqyaCrCNBcot/R+VnBaqtaWw8o=',
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
    urlEndpoint: 'https://ik.imagekit.io/beevfgcytiq/',
  });

  disposalPics.forEach(pic =>
    imageKit.deleteFile(pic.picId, (error, result) => {
      if (error) console.log(error);
      else console.log('Image deleted successfully!');
    })
  );
};

export default deleteOldPicture;
