import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const taskSlice = createSlice({
  name: 'task',
  initialState: {
    tasks: [],
    error: null,
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
      state.error = null; 
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload); 
      state.error = null; 
    },
    updateTask: (state, action) => {
      const updatedTask = action.payload;
      state.tasks = state.tasks.map(list => {
        return {
          ...list,
          tasks: list.tasks.map(task =>
            task._id === updatedTask._id ? updatedTask : task
          )
        };
      });
      state.error = null;
    },
    removeTaskFromState: (state, action) => {
      const taskId = action.payload;
      state.tasks.forEach(list => {
        list.tasks = list.tasks.filter(task => task._id !== taskId);
      });
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setTasks, addTask, updateTask, removeTaskFromState, setError } = taskSlice.actions;
const getToken = () => localStorage.getItem('token');

export const fetchTasks = (listId) => async (dispatch) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No authorization token found');
    }

    const response = await axios.get(`http://localhost:5000/api/lists/${listId}/tasks`, {
      headers: {
        'x-auth-token': token,
      },
    });

    dispatch(setTasks(response.data));
  } catch (error) {
    dispatch(setError(error.response ? error.response.data.msg : 'Error fetching tasks'));
  }
};

export const createTask = (taskData) => async (dispatch) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No authorization token found');
    }

    const response = await axios.post(
      `http://localhost:5000/api/lists/${taskData.listId}/tasks`,
      taskData,
      {
        headers: {
          'x-auth-token': token,
        },
      }
    );

    dispatch(addTask(response.data));

  } catch (error) {
    dispatch(setError(error.response ? error.response.data.message : 'Error creating task'));
  }
};


export const updateTaskOnServer = (updatedTask) => async (dispatch) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No authorization token found');
    }

    dispatch(updateTask(updatedTask)); 

    await axios.put(
      `http://localhost:5000/api/tasks/${updatedTask._id}`,
      updatedTask,
      {
        headers: {
          'x-auth-token': token,
        },
      }
    );
  } catch (error) {
    dispatch(setError(error.response ? error.response.data.msg : 'Error updating task'));
  }
};

export const deleteTask = (taskId) => async (dispatch) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No authorization token found');
    }

    await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
      headers: {
        'x-auth-token': token,
      },
    });

    dispatch(removeTaskFromState(taskId));
  } catch (error) {
    dispatch(setError(error.response ? error.response.data.msg : 'Error deleting task'));
  }
};

export default taskSlice.reducer;
