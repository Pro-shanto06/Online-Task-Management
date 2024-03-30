import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: null,
    error: null,
    success: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      state.success = action.payload.msg;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.success = null;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
      state.error = null;
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.success = null;
    },
  },
});

export const { setUser, setError, setSuccess, logoutUser } = userSlice.actions;

export const loginUser = (formData, navigate) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', formData);
    const { user, token, msg } = response.data;
 
    dispatch(setUser({ user, token, msg }));
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);

    navigate('/board');
  } catch (error) {
    dispatch(setError(error.response ? error.response.data.msg : 'Login failed. Please try again later.'));
  }
};


export const signupUser = (formData, navigate) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/register', formData);
    const { user, token, msg } = response.data;
    dispatch(setUser({ user, token, msg }));
    setTimeout(() => {
      dispatch(setSuccess(null)); 
      navigate('/login');
    }, 1000);
  } catch (error) {
    dispatch(setError(error.response ? error.response.data.msg : 'Signup failed. Please try again later.'));
  }
};

export const performLogout = () => async (dispatch) => {
  try {
    await axios.post('http://localhost:5000/api/auth/logout');
    dispatch(logoutUser());
    localStorage.removeItem('token');
  } catch (error) {
    dispatch(setError('Logout failed. Please try again later.'));
  }
};

export default userSlice.reducer;
