import React, { useState } from 'react';
import resizeImage from '../../utils/resizeImage';
import api from '../../utils/api';

export default function Reports() {
  const [images, setImages] = useState([]);

  const onFileChange = (e) => {
    setImages(e.target.files);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();

    for (const image of images) {
      const resizedImage = await resizeImage(image);
      formData.append('images', resizedImage);
    }

    const res = await api.post('/report', formData);
    console.log(res.data);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type='file'
        name='images'
        accept='image/*'
        onChange={onFileChange}
        multiple
      />
      <button type='submit'>Upload</button>
    </form>
  );
}
