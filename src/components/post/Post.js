import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, shallowEqual } from 'react-redux';
import { useSelector } from '../../redux/store';
import {
  getPost,
  resetPost,
  becomePicketer,
} from '../../redux/slices/postSlice';
import Report from './Report';

export default function Post() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.user.email);
  const post = useSelector((state) => state.post.post, shallowEqual);
  const { title, location, picketer, description } = post;

  useEffect(() => {
    if (id) dispatch(getPost(id));
    return () => dispatch(resetPost());
  }, [id, dispatch]);

  return (
    <>
      <h1>Title: {title}</h1>
      <h1>Location: {location}</h1>
      <h1>Description: {description}</h1>

      {picketer ? (
        <h1>Picketer: {picketer}</h1>
      ) : (
        <h1 onClick={() => dispatch(becomePicketer(id, email))}>
          Become a picketer
        </h1>
      )}

      {email === picketer && <Report />}
    </>
  );
}
