import React from "react";

export const HeartSvg = ({ classname, liked }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-6 w-6 text-pink-500 ${classname}`}
      fill={`${liked ? "rgb(219 39 119)" : "none"}`}
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  );
};

export const CommentSvg = ({ classname }) => {
  return (
    <svg
      fill="currentColor"
      className={`h-6 w-6 text-blue-500 ${classname}`}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M21.71,4.72,19.28,2.29a1,1,0,0,0-1.41,0L12.29,7.87a1,1,0,0,0-.29.71V11a1,1,0,0,0,1,1h2.42a1,1,0,0,0,.71-.29l5.58-5.58A1,1,0,0,0,21.71,4.72ZM15,10H14V9l4.58-4.58,1,1Zm4,2h0a1,1,0,0,0-1,1,7,7,0,0,1-7,7H5.41l.64-.63a1,1,0,0,0,0-1.42A7,7,0,0,1,11,6a1,1,0,0,0,0-2h0A9,9,0,0,0,4,18.62L2.29,20.29a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h8a9,9,0,0,0,9-9A1,1,0,0,0,19,12Z" />
    </svg>
  );
};

export const sendCommentSvg = () => {
  <svg
    width="800px"
    height="800px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    stroke="#000000"
    stroke-width="1"
    stroke-linecap="round"
    stroke-linejoin="miter"
  >
    <polygon
      points="22 2 22 16 14 16 8 21 8 16 2 16 2 2 22 2"
      fill="currentColor"
      opacity="0.1"
      stroke-width="0"
    ></polygon>
    <polygon points="22 2 22 16 14 16 8 21 8 16 2 16 2 2 22 2"></polygon>
  </svg>;
};
