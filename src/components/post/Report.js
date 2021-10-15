import React, { useState } from 'react';
import { toast } from 'react-toastify';
import resizeImage from '../../utils/resizeImage';
import api from '../../utils/api';
import { ReactComponent as XMarkIcon } from '../../assets/x-mark.svg';
import {
  Top,
  Heading,
  Form,
  DropArea,
  Input,
  Button,
  Paragraph,
  Container,
  IconWrapper,
} from './ReportStyles';

export default function Reports() {
  const [drag, setDrag] = useState(false);
  const [images, setImages] = useState([]);

  const onDragEnter = () => setDrag(true);
  const onDragLeave = () => setDrag(false);
  const onDrop = () => setDrag(false);

  const onFileChange = () => console.log('Changed');

  const onFileDrop = (e) => {
    const { files } = e.target;

    if (files.length) {
      let imgs = images;
      for (const file of files) {
        if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
          toast.error(`${file.name} is not valid`);
        } else {
          imgs = [...imgs, file];
        }
      }
      setImages(imgs);
      onFileChange(imgs);
    }
  };

  const removeFile = (image) => {
    const updatedList = [...images];
    updatedList.splice(images.indexOf(image), 1);
    setImages(updatedList);
    onFileChange(updatedList);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();

    for (const image of images) {
      const resizedImage = await resizeImage(image);
      formData.append('images', resizedImage);
    }

    try {
      await api.post('/report', formData);
      toast.success('Uploaded');
      setImages([]);
    } catch (err) {
      toast.error(err.response.data);
    }
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
          <h5>Click or Drop your images here</h5>

          <Input
            type='file'
            name='images'
            accept='image/*'
            onChange={onFileDrop}
            multiple
          />
        </DropArea>

        <Button type='submit'>Upload</Button>

        {images.length > 0 && (
          <>
            <Top>
              <Paragraph>Ready to upload</Paragraph>
            </Top>

            {images.map((item, index) => (
              <Container key={index}>
                <p>{item.name}</p>

                <IconWrapper onClick={() => removeFile(item)}>
                  <XMarkIcon />
                </IconWrapper>
              </Container>
            ))}
          </>
        )}
      </Form>
    </>
  );
}
