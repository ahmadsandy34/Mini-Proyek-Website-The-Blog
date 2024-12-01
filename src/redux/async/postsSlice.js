import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://lumoshive-academy-media-api.vercel.app/api";

export const subscribe = createAsyncThunk("posts/subscribe", async (email) => {
  const response = await axios.post(`${API_URL}/subscribe`, { email }  );
  return response.data;
});

const initialState = {
  recentPosts: [], 
  posts: [],       
  key: "",
  loading: false,
  error: null,
  isSuccess: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setRecentPosts: (state, action) => {
      state.recentPosts = action.payload;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setKey: (state, action) => {
      state.key = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(subscribe.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(subscribe.fulfilled, (state) => {
      state.loading = false;
      state.isSuccess = true;
    });
    builder.addCase(subscribe.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });
  },
});

export const { setRecentPosts, setPosts, setKey } = postsSlice.actions;

export default postsSlice.reducer;
