import Resizer from 'react-image-file-resizer';

const resizeImage = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1000, // maxWidth
      1000, // maxHeight
      'JPEG', // WEBP, JPEG, PNG
      90, // quality
      0, // rotation
      (result) => {
        resolve(
          new File([result], file.name, {
            lastModified: file.lastModified,
            type: file.type,
          })
        );
      },
      'blob'
    );
  });

export default resizeImage;
