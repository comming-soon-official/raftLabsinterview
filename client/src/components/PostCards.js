import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  CurrentUser,
  addComments,
  addLikes,
  getComments,
  getLikedorNot,
  getLikes,
  getUserbyUsername,
  removeLikes,
} from "../services/ServiceAPI";
import { CommentSvg, HeartSvg } from "../constant/AllSvgs";
import { useSelector } from "react-redux";

const PostCards = ({
  discription,
  title,
  date,
  posts,
  username,
  image,
  mentions,
}) => {
  const [allComments, setAllComments] = useState([]);
  const [LikesandComments, setLikesandComments] = useState({
    likes: 0,
    comments: 0,
  });
  const [liked, setLiked] = useState(false);
  const [likeId, setLikeID] = useState("");
  const [comments, setComments] = useState("");
  const [showComment, setShowComment] = useState(false);
  const navigate = useNavigate();
  const currentuser = useSelector((state) => state.user.currentuser);
  const currentID = currentuser ? currentuser.id : null;
  useEffect(() => {
    getLikedorNot(posts).then((res) => {
      if (res.length === 0) {
        setLiked(false);
        setLikeID("");
      } else {
        setLiked(true);
        setLikeID(res[0].id);
      }
    });
  }, []);
  useEffect(() => {
    getLikes(posts).then((res) => {
      setLikesandComments((prev) => {
        let tempValue = { ...prev };
        tempValue.likes = res.length;
        return tempValue;
      });
    });
    getComments(posts).then((res) => {
      setAllComments(() => res);
      setLikesandComments((prev) => {
        let tempValue = { ...prev };
        tempValue.comments = res.length;
        return tempValue;
      });
    });
  }, []);
  const handleLike = () => {
    if (currentuser) {
      if (liked === true) {
        removeLikes(likeId).then((res) => {
          setLiked(false);
          setLikeID("");
          setLikesandComments((prev) => {
            let tempValue = { ...prev };
            tempValue.likes -= 1;
            return tempValue;
          });
        });
      } else {
        addLikes(posts).then((res) => {
          setLiked(true);
          setLikeID(res.id);
          setLikesandComments((prev) => {
            let tempValue = { ...prev };
            tempValue.likes += 1;
            return tempValue;
          });
        });
      }
    } else {
      navigate("/login");
    }
  };

  const handleFillComment = (e) => {
    let comment = e.target.value;
    setComments(() => comment);
  };
  const handleComments = () => {
    if (currentuser) {
      if (comments !== "") {
        addComments(posts, comments).then((res) => {
          const newComment = {
            id: res.id,
            comment: comments,
            user: currentuser,
            username: currentuser.get("username"),
          };

          setAllComments((prevComments) => [...prevComments, newComment]);

          setLikesandComments((prev) => {
            let tempValue = { ...prev };
            tempValue.comments += 1;
            return tempValue;
          });

          setComments("");
        });
      }
    } else {
      navigate("/login");
    }
  };
  const handleShowComments = () => {
    setShowComment((prev) => !prev);
  };
  const getUsername = (user) => {
    getUserbyUsername(user).then((res) => {
      if (res === currentID) {
        console.log("hello");
        navigate("/profile");
      } else {
        console.log("not hello");

        navigate("/othersprofile", { state: res });
      }
    });
  };
  return (
    <div className="flex flex-col">
      <div className="card w-96 bg-base-100 shadow-lg border-2 m-5">
        {image ? (
          <figure className="px-10 pt-10">
            <img src={image} alt="Shoes" className="rounded-xl" />
          </figure>
        ) : null}

        <div className="card-body">
          {username ? (
            <div
              onClick={() => getUsername(username)}
              className="opacity-70 cursor-pointer"
            >
              <span className="font-semibold"> profile :</span> {username}
            </div>
          ) : null}{" "}
          <div className="flex flex-wrap">
            {mentions &&
              mentions.map((values, i) => (
                <div
                  key={i}
                  onClick={() => getUsername(values.value)}
                  className="bg-base-300 p-1 rounded-lg text-sm cursor-pointer mx-1"
                >
                  {values.label}
                </div>
              ))}
          </div>
          <h2 className="card-title">{title}</h2>
          <p className="whitespace-pre-wrap">{discription}</p>
          <div className="opacity-70">
            {date.toLocaleString("en-us", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </div>
          <div className="card-actions justify-start ">
            <div className="flex ">
              <div className="flex flex-col">
                <button onClick={handleLike}>
                  <HeartSvg liked={liked} classname={"hover:text-pink-700"} />
                </button>
                {`${LikesandComments.likes} Likes`}
              </div>
              <div className="flex flex-col">
                <button className="">
                  <CommentSvg classname={"hover:text-blue-700"} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium opacity-90">
                Comments
              </label>
              <div className="opacity-70">{`${LikesandComments.comments} Comments`}</div>

              <div className="flex">
                <textarea
                  onChange={handleFillComment}
                  value={comments}
                  type="text"
                  className="input input-bordered w-full max-w-xs mb-2 mr-2"
                  placeholder="Eg:- This post is soo Good"
                />

                <buttom onClick={handleComments} className="btn">
                  send
                </buttom>
              </div>
              <button onClick={handleShowComments} className="opacity-70">
                {showComment ? "hide comments" : "show comments"}
              </button>
              {showComment ? (
                <div>
                  {allComments.map((items, i) => {
                    return (
                      <div key={i}>
                        <div className="w-full bg-base-200 p-2 my-2 rounded-xl">
                          <div>{items.comment}</div>
                          <p
                            onClick={() => getUsername(items.username)}
                            className="cursor-pointer text-xs opacity-70"
                          >
                            @{items.username}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCards;
