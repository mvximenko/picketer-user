import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, shallowEqual } from 'react-redux';
import { useSelector } from '../../redux/store';
import { getUser, getUserSuccess } from '../../redux/slices/userSlice';
import api from '../../utils/api';
import {
  OuterContainer,
  InnerContainer,
  Form,
  Heading,
  Grid,
  Wrapper,
  Span,
  Input,
  Buttons,
  Button,
} from './UserFormStyles';

const initialState = {
  name: '',
  surname: '',
  patronymic: '',
  email: '',
  password: '',
};

export default function UserForm() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user, shallowEqual);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { name, surname, patronymic, password } = formData;

  useEffect(() => {
    if (!user) dispatch(getUser());
    if (!loading && user) {
      const userData = { ...initialState };
      for (const key in user) {
        if (key in userData) userData[key] = user[key];
      }
      setFormData(userData);
    }
  }, [user, loading, dispatch]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { password, ...rest } = formData;
      const hasEmptyFields = Object.values(rest).some((value) => value === '');

      if (hasEmptyFields) {
        toast.error('Please fill in all fields');
      } else {
        await api.put('/users/profile', open ? formData : rest);
        toast.success('User updated');
        getUserSuccess(formData);
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

              <Span onClick={() => setOpen(!open)}>
                {open ? 'Close' : 'Change'}
              </Span>

              {open && (
                <Input
                  type='password'
                  name='password'
                  id='password'
                  autoComplete='off'
                  placeholder='Password'
                  minLength='6'
                  required
                  value={password}
                  onChange={onChange}
                />
              )}
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
