import { useEffect } from 'react';
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
  StyledLink,
  Title,
  HR,
  Description,
  Location,
  Picketer,
  DateInfo,
} from './PostsStyles';

export default function Posts() {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.user.email);
  const posts = useSelector((state) => state.post.posts, shallowEqual);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Container>
      <Top>
        <Heading>Posts</Heading>
        <CreateLink to='/create-post'>Create New Post</CreateLink>
      </Top>

      {posts.map((post) => (
        <Card key={post._id}>
          <StyledLink to={`/posts/${post._id}`}>
            <Title>{post.title}</Title>
          </StyledLink>
          <HR />

          <Description>{post.description}</Description>
          <HR />

          <Location>Location: {post.location}</Location>
          <HR />

          {post.picketer ? (
            <Picketer>Picketer: {post.picketer}</Picketer>
          ) : (
            <Picketer onClick={() => dispatch(becomePicketer(post._id, email))}>
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
