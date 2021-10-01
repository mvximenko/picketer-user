import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { useDispatch, shallowEqual } from 'react-redux';
import { useSelector } from '../../redux/store';
import { getPosts, becomePicketer } from '../../redux/slices/postSlice';
import { Container, StyledLink, Info } from './PostsStyles';

export default function Posts() {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.user.email);
  const posts = useSelector((state) => state.post.posts, shallowEqual);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <>
      <div>
        <h1>Active</h1>
        <Link to='/create-post'>Create New Post</Link>
      </div>

      {posts.map((post) => (
        <Container key={post._id}>
          <StyledLink to={`/posts/${post._id}`}>
            <Info>Description: {post.description}</Info>
            <Info>Location: {post.location}</Info>
            <Info>
              {`Date: `}
              <Moment format='HH:MM DD/MM/YY'>{post.date}</Moment>
            </Info>
          </StyledLink>

          {post.picketer ? (
            <Info>Picketer: {post.picketer}</Info>
          ) : (
            <Info onClick={() => dispatch(becomePicketer(post._id, email))}>
              Become a picketer
            </Info>
          )}
        </Container>
      ))}
    </>
  );
}
