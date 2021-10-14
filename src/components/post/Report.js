import React, { useState } from 'react';
import resizeImage from '../../utils/resizeImage';
import api from '../../utils/api';
import { Top, Heading, Form, DropArea, Input, Button } from './ReportStyles';

export default function Reports() {
  const [drag, setDrag] = useState(false);
  const [images, setImages] = useState([]);

  const onDragEnter = () => setDrag(true);
  const onDragLeave = () => setDrag(false);
  const onDrop = () => setDrag(false);

  const onFileChange = () => console.log('Changed');

  const onFileDrop = (e) => {
    const newImage = e.target.files[0];
    if (newImage) {
      const updatedList = [...images, newImage];
      setImages(updatedList);
      onFileChange(updatedList);
    }
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
    <>
      <Top>
        <Heading>Upload</Heading>
      </Top>

      <Form onSubmit={onSubmit}>
        <DropArea
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          drag={drag}
        >
          <h5>Click or Drop your files here</h5>

          <Input
            type='file'
            name='images'
            accept='image/*'
            onChange={onFileDrop}
            multiple
          />
        </DropArea>

        <Button type='submit'>Upload</Button>
      </Form>
    </>
  );
}
