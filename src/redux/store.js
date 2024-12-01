import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./async/postsSlice";

export const store = configureStore({
    reducer: {
        posts: postsReducer,
    },
});