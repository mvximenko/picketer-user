import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { useDispatch, shallowEqual } from 'react-redux';
import { useSelector } from '../../redux/store';
import { getPosts, becomePicketer } from '../../redux/slices/postSlice';
import { Container, StyledLink, Paragraph } from './PostsStyles';

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
            <Paragraph>Description: {post.description}</Paragraph>
            <Paragraph>Location: {post.location}</Paragraph>
            <Paragraph>
              {`Date: `}
              <Moment format='HH:MM DD/MM/YY'>{post.date}</Moment>
            </Paragraph>
          </StyledLink>

          {post.picketer ? (
            <Paragraph>Picketer: {post.picketer}</Paragraph>
          ) : (
            <Paragraph
              onClick={() => dispatch(becomePicketer(post._id, email))}
            >
              Become a picketer
            </Paragraph>
          )}
        </Container>
      ))}
    </>
  );
}
