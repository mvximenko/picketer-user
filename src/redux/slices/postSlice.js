import { createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';

const initialState = {
  posts: [],
  post: {
    title: '',
    location: '',
    description: '',
    picketer: '',
  },
  loading: true,
  error: null,
};

const post = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getPostsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getPostsSuccess: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    },
    getPostsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getPostSuccess: (state, action) => {
      state.post = action.payload;
      state.loading = false;
    },
    setPicketerSuccess: (state, action) => {
      const foundIndex = state.posts.findIndex(
        (post) => post._id === action.payload.id
      );
      state.posts[foundIndex].picketer = action.payload.email;
      state.post.picketer = action.payload.email;
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
  getPostsStart,
  getPostsSuccess,
  getPostsFailure,
  getPostSuccess,
  setPicketerSuccess,
  updatePost,
  resetPost,
} = post.actions;

export const getPosts = (query) => async (dispatch) => {
  try {
    dispatch(getPostsStart());
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

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch(getPostsStart());
    const res = await api.get(`/posts/${id}`);
    dispatch(getPostSuccess(res.data));
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
  try {
    const body = { id, email };
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
