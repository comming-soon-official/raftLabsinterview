import React, { useEffect, useState } from "react";
import { searchPostsByTitle } from "../services/ServiceAPI";
import { useSelector } from "react-redux";
import PostCards from "./PostCards";

const Posts = () => {
  const fetchAllPosts = useSelector((state) => state.posts);

  const searchedposts = useSelector((state) => state.posts.search);
  const [allPosts, setAllPosts] = useState([]);
  useEffect(() => {
    searchPostsByTitle(searchedposts).then((res) => {
      setAllPosts(res);
    });
  }, [searchedposts]);

  // fetchAllPosts.posts.map((items, i) => {
  //   console.log(items.posts.get("mentions"));
  // });
  return (
    <div className="flex flex-wrap">
      {searchedposts
        ? allPosts.map((items, i) => (
            <PostCards
              key={i}
              posts={items}
              image={items.get("image")}
              // username={items.username}
              title={items.get("title")}
              discription={items.get("discription")}
              date={items.get("Date")}
            />
          ))
        : fetchAllPosts.posts.map((items, i) => (
            <PostCards
              key={i}
              posts={items.posts}
              image={items.posts.get("image")}
              username={items.username}
              title={items.posts.get("title")}
              discription={items.posts.get("discription")}
              date={items.posts.get("Date")}
              mentions={items.posts.get("mentions")}
            />
          ))}
    </div>
  );
};

export default Posts;
