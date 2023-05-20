import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { postSlice, userSlice } from "./slices";

const store = configureStore({
  reducer: {
    posts: postSlice.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
