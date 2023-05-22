import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/pages/Home";
import Signup from "./views/auth/Signup";
import Login from "./views/auth/Login";
import Profile from "./views/pages/Profile";
import { useDispatch } from "react-redux";
import { allPosts, currentProfile, currentuser } from "./redux/actions";
import { CurrentUser, fetchPost } from "./services/ServiceAPI";
import Navbar from "./layouts/Navbar";
import OthersProfile from "./views/pages/OthersProfile";
import CreatePost from "./views/pages/CreatePost";
const App = () => {
  const dispatch = useDispatch();

  fetchPost().then((res) => {
    dispatch(allPosts(res));
  });
  if (CurrentUser()) {
    dispatch(currentuser(CurrentUser()));
    dispatch(currentProfile(CurrentUser().get("profile")));
  }
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/newpost" element={<CreatePost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/othersprofile" element={<OthersProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
