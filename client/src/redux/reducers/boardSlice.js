import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    boards: [],
    error: null,
    success: null,
    boardDetails: null,
  },
  reducers: {
    setBoards: (state, action) => {
      state.boards = action.payload;
    },
    addBoard: (state, action) => {
      state.boards.push(action.payload);
    },
    updateBoard: (state, action) => {
      const { id, updatedBoard } = action.payload;
      state.boards = state.boards.map(board =>
        board._id === id ? { ...board, ...updatedBoard } : board
      );
    },
    deleteBoard: (state, action) => {
      const id = action.payload;
      state.boards = state.boards.filter(board => board._id !== id);
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.success = null;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
      state.error = null;
    },
    setBoardDetails: (state, action) => {
      state.boardDetails = action.payload;
    },
    clearBoardDetails: (state) => {
      state.boardDetails = null;
    },
  },
});

export const { setBoards, addBoard, updateBoard, deleteBoard, setError, setSuccess, setBoardDetails, clearBoardDetails } = boardSlice.actions;

// Thunks
export const fetchBoards = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authorization token found');
    }

    const response = await axios.get('http://localhost:5000/api/boards', {
      headers: {
        'x-auth-token': token,
      },
    });

    dispatch(setBoards(response.data));
  } catch (error) {
    dispatch(setError(error.response ? error.response.data.msg : 'Error fetching boards'));
  }
};

export const fetchBoardDetails = (boardId) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authorization token found');
    }

    const response = await axios.get(`http://localhost:5000/api/boards/${boardId}`, {
      headers: {
        'x-auth-token': token,
      },
    });

    dispatch(setBoardDetails(response.data));
  } catch (error) {
    dispatch(setError(error.response ? error.response.data.msg : 'Error fetching board details'));
  }
};

export const createBoard = (formData, invitedUsers = []) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No authorization token found');
    }

    const response = await axios.post(
      'http://localhost:5000/api/boards',
      { ...formData, invitedUsers },
      {
        headers: {
          'x-auth-token': token,
        },
      }
    );

    dispatch(addBoard(response.data));
    dispatch(setSuccess('Board created successfully'));
  } catch (error) {
    dispatch(setError(error.response ? error.response.data.msg : 'Error creating board'));
  }
};

export const updateBoardRequest = (boardId, formData) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No authorization token found');
    }

    const response = await axios.put(
      `http://localhost:5000/api/boards/${boardId}`,
      formData,
      {
        headers: {
          'x-auth-token': token,
        },
      }
    );

    dispatch(updateBoard({ id: boardId, updatedBoard: response.data }));
    dispatch(setSuccess('Board updated successfully'));
  } catch (error) {
    dispatch(setError(error.response ? error.response.data.msg : 'Error updating board'));
  }
};

export const deleteBoardRequest = (boardId) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No authorization token found');
    }

    await axios.delete(
      `http://localhost:5000/api/boards/${boardId}`,
      {
        headers: {
          'x-auth-token': token,
        },
      }
    );

    dispatch(deleteBoard(boardId));
    dispatch(setSuccess('Board deleted successfully'));
  } catch (error) {
    dispatch(setError(error.response ? error.response.data.msg : 'Error deleting board'));
  }
};

export default boardSlice.reducer;
