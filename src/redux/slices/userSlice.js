import { createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';

const initialState = {
  user: null,
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
  },
});

export const { getUserSuccess, getUserFailure } = user.actions;

export const getUser = () => async (dispatch) => {
  try {
    const res = await api.get('/auth');
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
