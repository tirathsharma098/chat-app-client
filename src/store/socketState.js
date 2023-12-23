import { createSlice } from "@reduxjs/toolkit";

const initial = {
    isConnected: false
};

const socketSlice = createSlice({
    name: "socket",
    initialState: initial,
    reducers: {
        onConnect(state, action){
            state.isConnected = true;
        },
        onDisconnect(state, action){
            state.isConnected = false;
        }
    },
});

export const socketAction = socketSlice.actions;
export default socketSlice.reducer;
