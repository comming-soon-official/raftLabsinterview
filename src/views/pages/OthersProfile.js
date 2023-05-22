import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import PostCards from "../../components/PostCards";
import {
  addFollow,
  getFollowedorNot,
  getFollowers,
  getPostsbyUserId,
  getotherUsersbyId,
  removeFollow,
} from "../../services/ServiceAPI";
import { useSelector } from "react-redux";

const OthersProfile = () => {
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [followed, setFollowed] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [followerID, setFollowerID] = useState("");
  const location = useLocation();
  const receivedProps = location.state;
  const navigate = useNavigate();
  const currentuser = useSelector((state) => state.user.currentuser);

  useEffect(() => {
    getPostsbyUserId(receivedProps).then((res) => {
      setPosts(res);
    });
    getotherUsersbyId(receivedProps).then((res) => {
      setUserInfo(res);
    });
  }, [receivedProps]);

  useEffect(() => {
    getFollowedorNot(userInfo).then((res) => {
      if (res.length === 0) {
        setFollowed(false);
        setFollowerID("");
      } else {
        setFollowed(true);
        setFollowerID(res[0].id);
      }
      console.log(res);
    });
    getFollowers(userInfo).then((res) => {
      setFollowers(res.length);
    });
  }, [userInfo]); // Pass userInfo as a dependency to re-run the effect when it changes

  const handleFollow = () => {
    if (currentuser) {
      if (followed) {
        removeFollow(followerID).then(() => {
          setFollowed(false);
          setFollowers((prevFollowers) => prevFollowers - 1);
        });
      } else {
        addFollow(userInfo).then((res) => {
          setFollowed(true);
          setFollowerID(res.id);
          setFollowers((prevFollowers) => prevFollowers + 1);
        });
      }
    } else {
      navigate("/login");
    }
  };
  return (
    <div>
      {userInfo && (
        <div className="">
          <div className="w-full bg-gray-300 p-5 flex justify-center">
            <div className="flex flex-col items-center">
              {userInfo ? (
                <img
                  className="rounded-full profile_img"
                  src={userInfo.get("profile")}
                  alt=""
                />
              ) : (
                <img
                  className="rounded-full profile_img"
                  src="https://t3.ftcdn.net/jpg/01/18/01/98/240_F_118019822_6CKXP6rXmVhDOzbXZlLqEM2ya4HhYzSV.jpg"
                />
              )}
              <h1 className="m-2 font-bold">{userInfo.get("username")}</h1>
              <div>{userInfo.get("bio")}</div>

              <div className="flex items-center">
                <p className="font-semibold mr-2">{followers} followers</p>
                <button
                  onClick={handleFollow}
                  className="btn btn-primary btn-sm"
                >
                  {followed ? "UnFollow" : "Follow"}
                </button>
              </div>
            </div>
          </div>
          <div className="ml-0 flex flex-wrap justify-center md:justify-start md:ml-10">
            {posts.map((items, i) => (
              <PostCards
                posts={items}
                key={i}
                title={items.get("title")}
                discription={items.get("discription")}
                date={items.get("Date")}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OthersProfile;
