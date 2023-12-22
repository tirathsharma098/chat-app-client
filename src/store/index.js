import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './notification';
import chatReducer from './chat';

const store = configureStore({
  reducer: { notification: notificationReducer, chat: chatReducer },
});

export default store;
