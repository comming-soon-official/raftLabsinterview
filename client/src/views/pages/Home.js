import React from "react";
import Posts from "../../components/Posts";
import { useSelector } from "react-redux";

const Home = () => {
  const currentuser = useSelector((state) => state.user.currentuser);

  return (
    <div>
      {currentuser ? (
        <div className="mt-5 ml-5 card w-96 bg-base-100 shadow-xl">
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
      ) : null}
      <Posts />
    </div>
  );
};

export default Home;
