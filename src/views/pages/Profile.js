import React, { useEffect, useState } from "react";
import PostCards from "../../components/PostCards";
import {
  CurrentUser,
  getPostsbyUsers,
  uploadProfile,
} from "../../services/ServiceAPI";
import { useSelector } from "react-redux";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [bio, setBio] = useState("");
  const [edit, setEdit] = useState(false);
  const currentuser = useSelector((state) => state.user.currentuser);
  const profilepic = useSelector((state) => state.user.profile);

  useEffect(() => {
    getPostsbyUsers().then((res) => {
      setPosts(res);
    });
    setBio(currentuser.get("bio"));
  }, []);
  const handleFillBio = (e) => {
    let currentbio = e.target.value;
    setBio(() => currentbio);
  };
  const handleSaveBio = () => {
    CurrentUser().set("bio", bio);
    CurrentUser().save();
    setEdit(() => false);
  };
  const handleEdit = () => {
    setEdit(() => true);
  };
  const handleUploadPic = (e) => {
    let pic = e.target.files[0];
    uploadProfile(pic).then((res) => {
      console.log(res);
    });
  };
  return (
    <div className="">
      <div className="w-full bg-gray-300 p-5 flex justify-center">
        <div className="flex flex-col items-center">
          {profilepic ? (
            <img className="rounded-full profile_img" src={profilepic} alt="" />
          ) : (
            <img
              className="rounded-full profile_img"
              src="https://t3.ftcdn.net/jpg/01/18/01/98/240_F_118019822_6CKXP6rXmVhDOzbXZlLqEM2ya4HhYzSV.jpg"
            />
          )}
          <h1 className="m-2 font-bold">Hi {currentuser.get("username")}</h1>
          {edit ? (
            <div className="flex flex-col items-center">
              <label className="font-semibold">
                Click to upload Profile Pic
              </label>
              <input
                type="file"
                accept="image/jpeg,png"
                onChange={handleUploadPic}
                className="file-input w-full max-w-xs"
              />
            </div>
          ) : null}
          <textarea
            disabled={edit === false ? "disabled" : ""}
            value={bio}
            onChange={handleFillBio}
            className="textarea mt-2"
            placeholder="Fill Your Bio"
          ></textarea>
          {edit ? (
            <button onClick={handleSaveBio} className="mt-2 btn btn-primary">
              Save
            </button>
          ) : (
            <button onClick={handleEdit} className="mt-2 btn btn-primary">
              Edit
            </button>
          )}
        </div>
      </div>
      <div className="ml-0 flex flex-wrap justify-center md:justify-start md:ml-10">
        {posts.map((items, i) => (
          <PostCards
            posts={items}
            key={i}
            username={items.get("username")}
            title={items.get("title")}
            discription={items.get("discription")}
            date={items.get("Date")}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
