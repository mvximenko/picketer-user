import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Moment from 'react-moment';
import { useDispatch, shallowEqual } from 'react-redux';
import { useSelector } from '../../redux/store';
import {
  getPost,
  resetPost,
  becomePicketer,
} from '../../redux/slices/postSlice';
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
} from './PostStyles';

export default function Post() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.user.email);
  const post = useSelector((state) => state.post.post, shallowEqual);
  const { title, location, picketer, description, date } = post;

  useEffect(() => {
    if (id) dispatch(getPost(id));
    return () => dispatch(resetPost());
  }, [id, dispatch]);

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

      {email === picketer && <Report />}
    </Container>
  );
}
