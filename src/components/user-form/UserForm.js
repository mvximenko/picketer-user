import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, shallowEqual } from 'react-redux';
import { useSelector } from '../../redux/store';
import { getUser, resetUser, updateUser } from '../../redux/slices/userSlice';
import api from '../../utils/api';
import {
  Container,
  Heading,
  Grid,
  Input,
  InputSubmit,
  Span,
  Wrapper,
} from './UserFormStyles';

export default function UserForm() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const id = useSelector((state) => state.auth.user._id);
  const user = useSelector((state) => state.user.user, shallowEqual);
  const { name, surname, patronymic, password } = user;

  useEffect(() => {
    if (id) dispatch(getUser(id));
    return () => dispatch(resetUser());
  }, [id, dispatch]);

  const onChange = (e) => {
    dispatch(updateUser({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const hasEmptyFields = Object.values(user).some((value) => value === '');

      if (hasEmptyFields) {
        toast.error('Please fill in all fields');
      } else {
        await api.put('/users/profile', user);
        toast.success('User updated');
      }
    } catch (err) {
      toast.error(err.toString());
    }
  };

  return (
    <Container>
      <Heading>Edit Profile</Heading>
      <form onSubmit={handleSubmit}>
        <Grid>
          <Input
            type='text'
            name='name'
            placeholder='Name'
            value={name}
            onChange={onChange}
          />
          <Input
            type='text'
            name='surname'
            placeholder='Surname'
            value={surname}
            onChange={onChange}
          />
          <Input
            type='text'
            name='patronymic'
            placeholder='Patronymic'
            value={patronymic}
            onChange={onChange}
          />
          {!isOpen ? (
            <Span onClick={() => setIsOpen(true)}>Change Password?</Span>
          ) : (
            <Input
              type='password'
              name='password'
              placeholder='Password'
              value={password}
              onChange={onChange}
            />
          )}
        </Grid>
        <Wrapper>
          <InputSubmit type='submit' value='Edit Profile' />
        </Wrapper>
      </form>
    </Container>
  );
}
