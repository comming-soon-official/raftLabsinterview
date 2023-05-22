import { postSlice, userSlice } from "./slices";
export const { allPosts, searchPosts } = postSlice.actions;
export const { currentuser, currentProfile } = userSlice.actions;
