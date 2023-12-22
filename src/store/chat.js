import { createSlice } from "@reduxjs/toolkit";

const initial = {
    currentChat: null,
    chatName: null,
    chatCreatedAt: null,
    chatLoading: false,
};

const chatSlice = createSlice({
    name: "chat",
    initialState: initial,
    reducers: {
        set(state, action) {
          // console.log(">> set State : ", JSON.parse(JSON.stringify(state)), action.payload)
            return { ...state, ...action.payload };
        },
    },
});

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
