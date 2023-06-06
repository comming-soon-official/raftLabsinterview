import React from "react";
import Posts from "../../components/Posts";
import { useSelector } from "react-redux";

const Home = () => {
  const currentuser = useSelector((state) => state.user.currentuser);
  const fetchAllPosts = useSelector((state) => state.posts);

  return (
    <div>
      {currentuser ? (
        <div className="justify-center flex md:ml-10 md:justify-start">
          <div className=" mt-5  card w-96 bg-base-100 shadow-xl">
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
      {currentuser ? (
        <div className="fixed bottom-24 right-24">
          <button
            onClick={() => (window.location = "/newpost")}
            className="group flex w-16 h-16 btn btn-success rounded-full hover:w-36"
          >
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 21 21"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                fill="none"
                fillRule="evenodd"
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(3 3)"
              >
                <path d="m7 1.5h-4.5c-1.1045695 0-2 .8954305-2 2v9.0003682c0 1.1045695.8954305 2 2 2h10c1.1045695 0 2-.8954305 2-2v-4.5003682" />

                <path d="m14.5.46667982c.5549155.5734054.5474396 1.48588056-.0167966 2.05011677l-6.9832034 6.98320341-3 1 1-3 6.9874295-7.04563515c.5136195-.5178979 1.3296676-.55351813 1.8848509-.1045243z" />

                <path d="m12.5 2.5.953 1" />
              </g>
            </svg>
            <p className="hidden group-hover:block">Create</p>
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
