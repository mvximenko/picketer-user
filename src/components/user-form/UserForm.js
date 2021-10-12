import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, shallowEqual } from 'react-redux';
import { useSelector } from '../../redux/store';
import { getUser, resetUser, updateUser } from '../../redux/slices/userSlice';
import api from '../../utils/api';
import {
  OuterContainer,
  InnerContainer,
  Form,
  Heading,
  Grid,
  Wrapper,
  Input,
  Buttons,
  Button,
} from './UserFormStyles';

export default function UserForm() {
  const dispatch = useDispatch();
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
    <OuterContainer>
      <InnerContainer>
        <Form onSubmit={handleSubmit}>
          <Heading>Edit Profile</Heading>

          <Grid>
            <Wrapper>
              <label htmlFor='name'>Name</label>
              <Input
                type='text'
                name='name'
                id='name'
                placeholder='Name'
                value={name}
                onChange={onChange}
              />
            </Wrapper>

            <Wrapper>
              <label htmlFor='surname'>Surname</label>
              <Input
                type='text'
                name='surname'
                id='surname'
                placeholder='Surname'
                value={surname}
                onChange={onChange}
              />
            </Wrapper>

            <Wrapper>
              <label htmlFor='patronymic'>Patronymic</label>
              <Input
                type='text'
                name='patronymic'
                id='patronymic'
                placeholder='Patronymic'
                value={patronymic}
                onChange={onChange}
              />
            </Wrapper>

            <Wrapper>
              <label htmlFor='password'>Password</label>
              <Input
                type='password'
                name='password'
                id='password'
                placeholder='Password'
                value={password}
                onChange={onChange}
              />
            </Wrapper>

            <Buttons>
              <Button type='submit' variant='blue'>
                Edit Profile
              </Button>
            </Buttons>
          </Grid>
        </Form>
      </InnerContainer>
    </OuterContainer>
  );
}
