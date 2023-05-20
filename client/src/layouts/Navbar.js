import React from "react";
import { LogOut } from "../services/AuthAPI";
import { CurrentUser } from "../services/ServiceAPI";
import { useDispatch, useSelector } from "react-redux";
import { searchPosts } from "../redux/actions";

const Navbar = () => {
  const profilepic = useSelector((state) => state.user.profile);

  const dispatch = useDispatch();
  const handleLogout = () => {
    LogOut().then((res) => {
      window.location = "/";
    });
  };
  const handleSearch = (e) => {
    let posts = e.target.value;
    dispatch(searchPosts(posts));
  };

  return (
    <div>
      <div className="navbar bg-base-100 shadow-2xl">
        <div className="flex-1">
          <a href="/" className="btn btn-ghost normal-case text-xl">
            RaftLabsMedia
          </a>
        </div>
        <div className="form-control">
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Search"
            className="input input-bordered mr-5"
          />
        </div>
        <div className="mr-5">
          {CurrentUser() ? (
            <p>{`Hey ${CurrentUser().get("username")}`}</p>
          ) : (
            <a className="btn btn-primary" href="/signup">
              Getting Started
            </a>
          )}
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                {profilepic ? (
                  <img src={profilepic} />
                ) : (
                  <img src="https://t3.ftcdn.net/jpg/01/18/01/98/240_F_118019822_6CKXP6rXmVhDOzbXZlLqEM2ya4HhYzSV.jpg" />
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              {CurrentUser() ? (
                <div>
                  <li>
                    <a href="/profile" className="justify-between">
                      Profile
                    </a>
                  </li>
                  <li>
                    <a onClick={handleLogout}>Logout</a>
                  </li>
                </div>
              ) : (
                <div>
                  <li>
                    <a href="/login" className="justify-between">
                      Login
                    </a>
                  </li>
                  <li>
                    <a href="/signup">Signup</a>
                  </li>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Navbar;
