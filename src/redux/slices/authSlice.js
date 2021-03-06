import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import { subscribeUserToPush } from '../../serviceWorkerRegistration';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: {
    name: '',
    surname: '',
    patronymic: '',
    email: '',
    role: '',
    password: '',
  },
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    loginFailure: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = initialState.user;
    },
    getUserSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
  },
});

export const { loginSuccess, loginFailure, getUserSuccess } = auth.actions;

export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/auth');
    dispatch(getUserSuccess(res.data));
    if (navigator.serviceWorker) {
      navigator.serviceWorker.ready.then((registration) => {
        subscribeUserToPush(registration, res.data._id);
      });
    }
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    const body = { email, password };
    const res = await api.post('/auth', body);
    dispatch(loginSuccess(res.data.token));
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) errors.forEach((error) => toast.error(error.msg));

    dispatch(loginFailure());
  }
};

export const logout = () => async (dispatch) => dispatch(loginFailure());

export default auth.reducer;
