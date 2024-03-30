import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const listSlice = createSlice({
  name: 'list',
  initialState: {
    lists: [],
    error: null,
  },
  reducers: {
    setLists: (state, action) => {
      state.lists = action.payload;
      state.error = null; // Reset error when lists are successfully set
    },
    addList: (state, action) => {
      state.lists.push(action.payload);
      state.error = null; // Reset error when list is successfully added
    },
    removeListFromState: (state, action) => {
      const listId = action.payload;
      state.lists = state.lists.filter(list => list._id !== listId);
      state.error = null; // Reset error when list is successfully removed
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLists, addList, removeListFromState, setError } = listSlice.actions;

export const fetchLists = (boardId) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authorization token found');
    }

    const response = await axios.get(`http://localhost:5000/api/${boardId}/lists`, {
      headers: {
        'x-auth-token': token,
      },
    });

    dispatch(setLists(response.data));
  } catch (error) {
    dispatch(setError(error.response ? error.response.data.msg : 'Error fetching lists'));
  }
};

export const createList = (formData) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authorization token found');
    }

    const response = await axios.post(
      `http://localhost:5000/api/${formData.boardId}/lists`,
      { title: formData.title },
      {
        headers: {
          'x-auth-token': token,
        },
      }
    );

    dispatch(addList(response.data));
  } catch (error) {
    dispatch(setError(error.response ? error.response.data.msg : 'Error creating list'));
  }
};

export const deleteList = (listId) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No authorization token found');
    }

    await axios.delete(
      `http://localhost:5000/api/lists/${listId}`,
      {
        headers: {
          'x-auth-token': token,
        },
      }
    );

    dispatch(removeListFromState(listId));
  } catch (error) {
    dispatch(setError(error.response ? error.response.data.msg : 'Error deleting list'));
  }
};

export default listSlice.reducer;
