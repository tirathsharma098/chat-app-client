import { createSlice } from "@reduxjs/toolkit";

const initial = {
    currentChat: null,
    chatName: null,
    chatReceiver: null,
    chatCreatedAt: null,
    chatLoading: false,
    messages: [],
};

const chatSlice = createSlice({
    name: "chat",
    initialState: initial,
    reducers: {
        set(state, action) {
          // console.log(">> set State : ", JSON.parse(JSON.stringify(state)), action.payload)
            return { ...state, ...action.payload };
        },
        newMessage(state, action){
          state.messages.push(action.payload)
        }
    },
});

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
