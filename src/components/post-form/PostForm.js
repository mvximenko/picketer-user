import { toast } from 'react-toastify';
import { useDispatch, shallowEqual } from 'react-redux';
import { useSelector } from '../../redux/store';
import { resetPost, updatePost } from '../../redux/slices/postSlice';
import api from '../../utils/api';
import {
  Container,
  Heading,
  Grid,
  Input,
  InputSubmit,
  Wrapper,
  TextArea,
} from './PostFormStyles';

export default function PostForm() {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post.post, shallowEqual);
  const { title, location, description } = post;

  const onChange = (e) => {
    dispatch(updatePost({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const hasEmptyFields = [title, location, description].some(
        (value) => value === ''
      );

      if (hasEmptyFields) {
        toast.error('Please fill in all fields');
      } else {
        await api.post('/posts', post);
        toast.success('Post created');
        dispatch(resetPost());
      }
    } catch (err) {
      toast.error(err.toString());
    }
  };

  return (
    <Container>
      <Heading>Add Post</Heading>
      <form onSubmit={handleSubmit}>
        <Grid>
          <Input
            type='text'
            name='title'
            placeholder='Title'
            value={title}
            onChange={onChange}
          />
          <Input
            type='text'
            name='location'
            placeholder='Location'
            value={location}
            onChange={onChange}
          />
        </Grid>

        <TextArea
          type='text'
          name='description'
          id='description'
          value={description}
          onChange={onChange}
          placeholder='Description...'
        />

        <Wrapper>
          <InputSubmit type='submit' value='Add Post' />
        </Wrapper>
      </form>
    </Container>
  );
}
