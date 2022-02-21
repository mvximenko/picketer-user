import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
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

const initialState = {
  name: '',
  surname: '',
  patronymic: '',
  email: '',
  password: '',
};

export default function RegisterUser() {
  const { id } = useParams();
  const history = useHistory();
  const [formData, setFormData] = useState(initialState);
  const { name, surname, patronymic, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await api.post(`invite/register/${id}`, {
        name,
        surname,
        patronymic,
        email,
        password,
      });

      history.push('/');
    } catch (err) {
      toast.error(err.toString());
    }
  };

  return (
    <OuterContainer>
      <InnerContainer>
        <Form onSubmit={handleSubmit}>
          <Heading>Register User</Heading>

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
                required
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
                required
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
                required
              />
            </Wrapper>

            <Wrapper>
              <label htmlFor='email'>Email</label>
              <Input
                type='email'
                name='email'
                id='email'
                placeholder='Email'
                value={email}
                onChange={onChange}
                required
              />
            </Wrapper>

            <Wrapper>
              <label htmlFor='password'>Password</label>
              <Input
                type='password'
                name='password'
                id='password'
                placeholder='Password'
                autoComplete='off'
                minLength='6'
                value={password}
                onChange={onChange}
                required
              />
            </Wrapper>

            <Buttons>
              <Button type='submit' variant='blue'>
                Register
              </Button>
            </Buttons>
          </Grid>
        </Form>
      </InnerContainer>
    </OuterContainer>
  );
}
