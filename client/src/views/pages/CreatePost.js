import React, { useEffect, useState } from "react";
import Select from "react-select";

import {
  createNewPost,
  usernameToMentionUsers,
} from "../../services/ServiceAPI";

const CreatePost = () => {
  const [postinfo, setPostInfo] = useState({ title: "", discription: "" });
  const [attachment, setAttachment] = useState(null);
  const [allusernames, setAllUsernames] = useState([]);
  const [mentions, setMentions] = useState([]);

  useEffect(() => {
    usernameToMentionUsers().then((res) => {
      setAllUsernames(() => res);
    });
  }, []);

  const handleFillTitle = (e) => {
    let title = e.target.value;
    setPostInfo((prev) => {
      let tempvalue = { ...prev };
      tempvalue.title = title;
      return tempvalue;
    });
  };

  const handleFillDiscription = (e) => {
    let discription = e.target.value;
    setPostInfo((prev) => {
      let tempvalue = { ...prev };
      tempvalue.discription = discription;
      return tempvalue;
    });
  };

  const CreateNewPost = () => {
    createNewPost(
      postinfo.title,
      postinfo.discription,
      attachment,
      mentions
    ).then((res) => {
      console.log(res);
      window.location = "/";
    });
  };

  const options = allusernames.map((value) => ({ value, label: `@${value}` }));

  const handleMentionChange = (selectedOptions) => {
    setMentions(selectedOptions);
  };

  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-xl font-bold">Create New Post</h1>
          <div className="flex flex-col">
            <div className="flex flex-col mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Title
              </label>
              <input
                onChange={handleFillTitle}
                type="text"
                className="input input-bordered w-full max-w-xs mb-2"
                placeholder="Eg:- Himal's New Invention"
              />
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Add Image
                </label>
                <input
                  onChange={(e) => {
                    setAttachment(e.target.files[0]);
                  }}
                  type="file"
                  accept="image/jpeg"
                  className="file-input w-full max-w-xs"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Description
              </label>
              <textarea
                onChange={handleFillDiscription}
                placeholder="Enter description"
                className="textarea textarea-bordered textarea-lg w-full max-w-xs"
              ></textarea>
            </div>
            <div>
              <p className="block text-sm font-medium text-gray-900 my-2">
                Mentions
              </p>
              <Select
                isMulti
                value={mentions}
                options={options}
                onChange={handleMentionChange}
              />
            </div>
          </div>
          <button onClick={CreateNewPost} className="btn">
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
