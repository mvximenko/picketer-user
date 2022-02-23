import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Moment from 'react-moment';
import { toast } from 'react-toastify';
import { useDispatch, shallowEqual } from 'react-redux';
import { useSelector } from '../../redux/store';
import {
  getPost,
  resetPost,
  becomePicketer,
} from '../../redux/slices/postSlice';
import api from '../../utils/api';
import Spinner from '../spinner/Spinner';
import Report from './Report';
import {
  Container,
  Top,
  Heading,
  Card,
  Title,
  HR,
  Description,
  Location,
  Picketer,
  DateInfo,
  Button,
} from './PostStyles';

export default function Post() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.post.error);
  const email = useSelector((state) => state.auth.user.email);
  const post = useSelector((state) => state.post.post, shallowEqual);
  const { title, location, picketer, description, date } = post;

  useEffect(() => {
    if (id) dispatch(getPost(id));
    return () => dispatch(resetPost());
  }, [id, dispatch]);

  const handleOnClick = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/report/fail/${id}`);
      toast.success('Done');
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  if (!error && !title) return <Spinner />;
  if (error) return <h1>Not Found</h1>;

  return (
    <Container>
      <Top>
        <Heading>Post</Heading>
      </Top>

      <Card>
        <Title>{title}</Title>

        <HR />

        <Description>{description}</Description>
        <HR />

        <Location>Location: {location}</Location>
        <HR />

        {picketer ? (
          <Picketer>Picketer: {picketer}</Picketer>
        ) : (
          <Picketer onClick={() => dispatch(becomePicketer(id, email))}>
            Become a picketer
          </Picketer>
        )}

        <DateInfo>
          <Moment format='HH:MM DD/MM/YY'>{date}</Moment>
        </DateInfo>
      </Card>

      {email === picketer && (
        <>
          <Report />
          <Button type='button' onClick={handleOnClick}>
            Event did not take place
          </Button>
        </>
      )}
    </Container>
  );
}
