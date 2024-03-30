import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import boardReducer from './reducers/boardSlice';
import listReducer from './reducers/listSlice';
import tasksReducer from './reducers/taskSlice'; 
import { setupListeners } from '@reduxjs/toolkit/query/react';

export const store = configureStore({
  reducer: {
    user: userReducer,
    board: boardReducer,
    list: listReducer,
    tasks: tasksReducer, 
  },
});

setupListeners(store.dispatch);

export default store;
