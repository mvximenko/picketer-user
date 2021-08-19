import { createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';

const initialState = {
  user: {
    name: '',
    surname: '',
    patronymic: '',
    email: '',
    role: '',
    password: '',
  },
  loading: true,
  error: {},
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    getUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUser: (state, action) => {
      state.user[action.payload.name] = action.payload.value;
    },
    resetUser: (state) => {
      state.user = initialState.user;
    },
  },
});

export const { getUserSuccess, getUserFailure, updateUser, resetUser } =
  user.actions;

export const getUser = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/users/user/${id}`);
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(
      getUserFailure({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

export default user.reducer;
