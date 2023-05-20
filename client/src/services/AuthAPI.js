import Parse from "./parseService";
export const Login = async (username, password) => {
  return await Parse.User.logIn(username, password)
    .then((user) => {
      return { status: "success", response: user };
    })
    .catch((error) => {
      return { status: "error", response: error.message };
    });
};
export const SignUp = async (username, password) => {
  return await Parse.User.signUp(username, password)
    .then((user) => {
      return { status: "success", response: user };
    })
    .catch((error) => {
      return { status: "error", response: error.message };
    });
};
export const LogOut = async () => {
  return await Parse.User.logOut();
};
