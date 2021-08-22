import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Moment from 'react-moment';
import { useDispatch, shallowEqual } from 'react-redux';
import { useSelector } from '../../redux/store';
import { getPosts } from '../../redux/slices/postSlice';
import { Container } from './PostsStyles';

export default function Posts() {
  const history = useHistory();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts, shallowEqual);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleRowClick = (id) => {
    history.push(`/posts/${id}`);
  };

  return (
    <>
      <div>
        <h1>Active</h1>
        <Link to='/create-post'>Create New Post</Link>
      </div>

      {posts.map((post) => (
        <Container key={post._id} onClick={() => handleRowClick(post._id)}>
          <p>{post.text}</p>
          <p>{post.location}</p>
          <p>
            <Moment format='HH:MM DD/MM/YY'>{post.date}</Moment>
          </p>
        </Container>
      ))}
    </>
  );
}
