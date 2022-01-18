import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Moment from 'react-moment';
import { useDispatch, shallowEqual } from 'react-redux';
import { useSelector } from '../../redux/store';
import { getPosts, becomePicketer } from '../../redux/slices/postSlice';
import {
  Container,
  Top,
  Heading,
  CreateLink,
  Card,
  Title,
  HR,
  Description,
  Location,
  Picketer,
  DateInfo,
} from './PostsStyles';

export default function Posts() {
  const dispatch = useDispatch();
  const history = useHistory();
  const email = useSelector((state) => state.auth.user.email);
  const posts = useSelector((state) => state.post.posts, shallowEqual);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleClick = (e, id) => {
    if (window.getSelection().toString()) {
      e.preventDefault();
    } else {
      history.push(`/posts/${id}`);
    }
  };

  return (
    <Container>
      <Top>
        <Heading>Posts</Heading>
        <CreateLink to='/create-post'>Create Post</CreateLink>
      </Top>

      {posts.map((post) => (
        <Card key={post._id} onClick={(e) => handleClick(e, post._id)}>
          <Title>{post.title}</Title>
          <HR />

          <Description>{post.description}</Description>
          <HR />

          <Location>Location: {post.location}</Location>
          <HR />

          {post.picketer ? (
            <Picketer>Picketer: {post.picketer}</Picketer>
          ) : (
            <Picketer
              onClick={(e) => {
                e.stopPropagation();
                dispatch(becomePicketer(post._id, email));
              }}
            >
              Become a picketer
            </Picketer>
          )}

          <DateInfo>
            <Moment format='HH:MM DD/MM/YY'>{post.date}</Moment>
          </DateInfo>
        </Card>
      ))}
    </Container>
  );
}
