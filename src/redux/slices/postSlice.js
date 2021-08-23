import { createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';

const initialState = {
  posts: [],
  post: {
    title: '',
    location: '',
    description: '',
  },
  loading: true,
  error: {},
};

const post = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getPostsSuccess: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    },
    getPostsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setPicketerSuccess: (state, action) => {
      const foundIndex = state.posts.findIndex(
        (post) => post._id == action.payload.id
      );
      state.posts[foundIndex].picketer = action.payload.email;
    },
    updatePost: (state, action) => {
      state.post[action.payload.name] = action.payload.value;
    },
    resetPost: (state) => {
      state.post = initialState.post;
    },
  },
});

export const {
  getPostsSuccess,
  getPostsFailure,
  setPicketerSuccess,
  updatePost,
  resetPost,
} = post.actions;

export const getPosts = (query) => async (dispatch) => {
  try {
    const res = await api.get(query ? `/posts${query}` : '/posts');
    dispatch(getPostsSuccess(res.data));
  } catch (err) {
    dispatch(
      getPostsFailure({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

export const becomePicketer = (id, email) => async (dispatch) => {
  const body = { id, email };
  try {
    const res = await api.put('/posts/picketer', body);
    if (res.status === 200) {
      dispatch(setPicketerSuccess({ id, email }));
    }
  } catch (err) {
    dispatch(
      getPostsFailure({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

export default post.reducer;
