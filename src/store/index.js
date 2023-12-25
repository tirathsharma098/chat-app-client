import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notification";
import chatReducer from "./chat";
import socketReducer from "./socketState";

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        chat: chatReducer,
        socket: socketReducer,
    },
});

export default store;
