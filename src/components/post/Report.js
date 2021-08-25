import React, { useState } from 'react';
import api from '../../utils/api';

export default function Reports() {
  const [images, setImages] = useState([]);

  const onFileChange = (e) => {
    setImages(e.target.files);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    var formData = new FormData();

    for (const image of images) {
      formData.append('images', image);
    }

    const res = await api.post('/report', formData);
    console.log(res.data);
  };

  return (
    <form onSubmit={onSubmit}>
      <input type='file' name='images' onChange={onFileChange} multiple />
      <button type='submit'>Upload</button>
    </form>
  );
}
