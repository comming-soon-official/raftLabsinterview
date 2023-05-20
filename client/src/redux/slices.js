import { createSlice } from "@reduxjs/toolkit";

const initialPostsValue = {
  posts: [],
  search: "",
};

export const postSlice = createSlice({
  name: "posts",
  initialState: initialPostsValue,
  reducers: {
    allPosts: (state, action) => {
      state.posts = action.payload;
    },
    searchPosts: (state, action) => {
      state.search = action.payload;
    },
  },
});

const initialUserValue = {
  currentuser: null,
  profile: "",
};
export const userSlice = createSlice({
  name: "user",
  initialState: initialUserValue,
  reducers: {
    currentuser: (state, action) => {
      state.currentuser = action.payload;
    },
    currentProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});
