import { createSlice } from '@reduxjs/toolkit';

const initial = { count: 0 };

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initial,
  reducers: {
    set(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice.reducer;
