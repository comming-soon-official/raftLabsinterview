import React from "react";
import Posts from "../../components/Posts";
import { useSelector } from "react-redux";

const Home = () => {
  const currentuser = useSelector((state) => state.user.currentuser);
  const fetchAllPosts = useSelector((state) => state.posts);

  return (
    <div>
      {currentuser ? (
        <div className="flex justify-center">
          <div className=" mt-5 -ml-9 card w-[430px] bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">hey What's Up??</h2>
              <p>Feeling Bored ? Lets create Some Memories</p>
              <div className="card-actions justify-end">
                <a href="/newpost" className="btn btn-primary">
                  Create New Post
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <br />
      <br />
      {fetchAllPosts.posts.length === 0 && currentuser === null ? (
        <div className="items-center mt-5 ml-5 card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Looks No posts :!</h2>
            <p>Ok.!! Lets create Some Memories</p>
            <div className="card-actions justify-end">
              <a href="/signup" className="btn btn-primary">
                Signup to create
              </a>
            </div>
          </div>
        </div>
      ) : (
        <Posts />
      )}
    </div>
  );
};

export default Home;
