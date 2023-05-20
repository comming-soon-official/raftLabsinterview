import Parse from "./parseService";

const Post = Parse.Object.extend("post");
const Likes = Parse.Object.extend("likes");
const Comments = Parse.Object.extend("comments");
const Follows = Parse.Object.extend("follow");

export const CurrentUser = () => {
  return Parse.User.current();
};

export const logineduser = CurrentUser() === null;

export const createNewPost = async (
  title,
  discription,
  attachment,
  mentions
) => {
  const newpost = new Post();
  if (attachment) {
    const image = new Parse.File(attachment.name, attachment);
    await image.save();

    const newStore = new Parse.Object("File");
    newStore.set("File", image);
    await newStore.save();
    newpost.set("image", image.url());
  }
  if (mentions) {
    newpost.set("mentions", mentions);
  }
  newpost.set("title", title);
  newpost.set("discription", discription);
  newpost.set("user", CurrentUser());
  newpost.set("Date", new Date());
  return await newpost.save();
};
export const fetchPost = async () => {
  const query = new Parse.Query(Post);
  query.descending("createdAt");
  query.include("user");
  return await query
    .find()
    .then((posts) => {
      return posts.map((post) => {
        const user = post.get("user");
        const username = user ? user.get("username") : null;
        return {
          posts: post,
          username: username,
        };
      });
    })
    .catch((err) => {
      return err;
    });
};

export const addLikes = async (post) => {
  const likes = new Likes();
  likes.set("post", post);
  likes.set("user", CurrentUser());
  return await likes.save();
};

export const removeLikes = async (likeId) => {
  const query = new Parse.Query(Likes);
  const like = await query.get(likeId);
  return await like.destroy();
};

export const getLikedorNot = async (post) => {
  const query = new Parse.Query(Likes);
  query.equalTo("user", CurrentUser());
  query.equalTo("post", post);
  return await query
    .find()
    .then((res) => {
      return res;
    })
    .catch((err) => err);
};
export const getLikes = async (post) => {
  const query = new Parse.Query(Likes);
  query.equalTo("post", post);

  return await query
    .find()
    .then((likes) => {
      return likes;
    })
    .catch((err) => {
      return err;
    });
};

export const addComments = async (post, comment) => {
  const comments = new Comments();
  comments.set("post", post);
  comments.set("user", CurrentUser());
  comments.set("comment", comment);
  return await comments.save();
};
export const getComments = async (post) => {
  const query = new Parse.Query(Comments);
  query.equalTo("post", post);
  query.include("user");

  return await query
    .find()
    .then((comments) => {
      return comments.map((comment) => {
        const user = comment.get("user");
        const username = user ? user.get("username") : null;
        return {
          comment: comment.get("comment"),
          username: username,
        };
      });
    })
    .catch((err) => {
      return err;
    });
};
export const addFollow = async () => {
  const follow = new Follows();
  follow.set("user", CurrentUser());
  return await follow.save();
};
export const getFollowers = async () => {
  const query = new Parse.Query(Follows);
  query.include("user");
  return await query
    .find()
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
export const getFollowedorNot = async () => {
  const query = new Parse.Query(Follows);
  query.equalTo("user", CurrentUser());
  return await query
    .find()
    .then((res) => {
      return res;
    })
    .catch((err) => err);
};
export const removeFollow = async (followId) => {
  const query = new Parse.Query(Follows);
  const follows = await query.get(followId);
  return await follows.destroy();
};

export const getPostsbyUsers = async () => {
  const query = new Parse.Query(Post);
  query.equalTo("user", CurrentUser());
  query.descending("createdAt");
  return await query
    .find()
    .then((posts) => {
      return posts;
    })
    .catch((err) => {
      return err;
    });
};

export const uploadProfile = async (file) => {
  let profilePic = new Parse.File(file.name, file);
  return await profilePic.save().then((res) => {
    var newStore = new Parse.Object("File");
    newStore.set("File", profilePic);
    newStore.save();
    CurrentUser().set("profile", res._url);
    return CurrentUser().save();
  });
};

export const getPostsbyUserId = async (userId) => {
  const user = new Parse.User();
  user.id = userId;
  const query = new Parse.Query(Post);
  query.equalTo("user", user);
  query.descending("createdAt");
  return await query.find().then((res) => {
    return res;
  });
};
export const getotherUsersbyId = async (userId) => {
  const query = new Parse.Query(Parse.User);
  query.equalTo("objectId", userId);
  return await query.first().then((res) => {
    return res;
  });
};

export const getUserbyUsername = async (username) => {
  const query = new Parse.Query(Parse.User);
  query.equalTo("username", username);
  query.select("objectId");
  return await query.first().then((res) => {
    return res.id;
  });
};
export const searchPostsByTitle = async (searchQuery) => {
  const query = new Parse.Query(Post);
  query.contains("title", searchQuery);
  query.descending("createdAt");
  const results = await query.find();
  return results;
};

export const usernameToMentionUsers = async () => {
  const query = new Parse.Query(Parse.User);
  query.select("username");
  return await query
    .find()
    .then((users) => {
      const usernames = users.map((user) => user.get("username"));
      return usernames;
    })
    .catch((error) => {
      return error;
    });
};
