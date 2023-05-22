import React, { useState } from "react";
import { SignUp } from "../../services/AuthAPI";

const Signup = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    showpassword: false,
    showConfirmPassword: false,
  });

  const handleSignup = (e) => {
    e.preventDefault();
    setIsLoading(true);

    SignUp(values.username, values.password).then((res) => {
      if (res.status === "success") {
        console.log(res.response);
        window.location = "/";
      } else {
        setIsLoading(true);
        console.log(res.response);
      }
      setIsLoading(false);
    });
  };

  const handleFillUsername = (e) => {
    let username = e.target.value;
    setValues((prev) => {
      let tempValue = { ...prev };
      tempValue.username = username;
      return tempValue;
    });
  };
  const handleFillPassword = (e) => {
    let password = e.target.value;

    setValues((prev) => {
      let tempValue = { ...prev };
      tempValue.password = password;
      return tempValue;
    });
  };
  const handleFillConfirmPassword = (e) => {
    let confirmPassword = e.target.value;

    setValues((prev) => {
      let tempValue = { ...prev };
      tempValue.confirmPassword = confirmPassword;
      return tempValue;
    });
  };
  const handleShowPassword = () => {
    setShowPassword((prev) => {
      let tempValue = { ...prev };
      tempValue.showpassword = !tempValue.showpassword;
      return tempValue;
    });
  };
  const handleShowConfirmPassword = () => {
    setShowPassword((prev) => {
      let tempValue = { ...prev };
      tempValue.showConfirmPassword = !tempValue.showConfirmPassword;
      return tempValue;
    });
  };
  return (
    <div className="h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="shadow-2xl rounded-2xl bg-white border border-gray-300 w-80 py-8 flex items-center  flex-col mb-3">
        <form className="mt-8 w-64 flex flex-col" onSubmit={handleSignup}>
          <div className="mb-5">
            <h2>RaftLabs</h2>
          </div>
          <h1 className="mb-3 self-start text-2xl font-semibold">Signup</h1>
          <div className="border-b-2 px-2 py-2 border-gray-300 flex mb-3">
            <input
              autoFocus
              className="w-full focus:outline-none focus:border-gray-400 active:outline-none"
              id="username"
              placeholder="Username"
              type="text"
              onChange={handleFillUsername}
            />
          </div>

          <div className="border-b-2 px-2 py-2  border-gray-300 flex mb-3">
            <input
              autoFocus
              className=" w-full focus:outline-none focus:border-gray-400 active:outline-none "
              id="password"
              placeholder="Password"
              type={showPassword.showpassword ? "text" : "password"}
              onChange={handleFillPassword}
            />

            {showPassword.showpassword ? (
              <div onClick={handleShowPassword} className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 opacity-50"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            ) : (
              <div onClick={handleShowPassword} className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 opacity-50 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              </div>
            )}
          </div>
          <div className="border-b-2 px-2 py-2 border-gray-300 flex mb-5">
            <input
              autoFocus
              className=" w-full focus:outline-none focus:border-gray-400 active:outline-none "
              id="password"
              placeholder="Confirm Password"
              type={showPassword.showConfirmPassword ? "text" : "password"}
              onChange={handleFillConfirmPassword}
            />

            {showPassword.showConfirmPassword ? (
              <div
                onClick={handleShowConfirmPassword}
                className="cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 opacity-50 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            ) : (
              <div
                onClick={handleShowConfirmPassword}
                className="cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 opacity-50 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              </div>
            )}
          </div>
          <button
            className={`btn btn-primary btn-sm ${isLoading ? "loading" : ""}`}
          >
            Sign up
          </button>
        </form>
        <div className="flex justify-evenly space-x-2 w-64 mt-4">
          <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
          <span className="flex-none uppercase text-gray-400 font-semibold">
            or
          </span>
          <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
        </div>
        <div className=" text-center">
          <span className="text-sm">Already Have a account?</span>
          <a
            href="/login"
            className="text-blue-500 cursor-pointer text-sm font-semibold"
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
