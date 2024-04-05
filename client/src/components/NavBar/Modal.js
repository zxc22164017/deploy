import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import authServices from "../../services/authServices";

const Modal = (props) => {
  let { show, setShow, user, setUser } = props;

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [msg, setMsg] = useState("");

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const loginHandler = () => {
    console.log("login");

    authServices
      .login(email, password)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        console.log("login success");
        setUser(authServices.getCurrentUser());
        window.location.reload();
        setShow(false);
      })
      .catch((e) => {
        let error = e.response.data;
        Object.hasOwn(error, "msg")
          ? setMsg(e.response.data.msg)
          : setMsg(e.response.data);
      });
  };

  return (
    show &&
    createPortal(
      <>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div
            className="fixed inset-0 w-full h-full bg-black opacity-40"
            onClick={() => setShow(false)}
          ></div>
          <div className="flex items-center min-h-screen px-4 py-8">
            <div className="relative w-full max-w-md p-10 mx-auto bg-white rounded-md shadow-lg">
              {msg && (
                <div className="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3">
                  <p className="font-bold">{msg}</p>
                </div>
              )}
              <div className="flex flex-col">
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 absolute r-0 right-0 hover:w-7 hover:h-7 active:w-6 active:h-6"
                    onClick={() => {
                      setShow(false);
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <h1 className="font-sans font-bold text-center text-slate-600 text-xl">
                  Log in
                </h1>
                <form
                  className="flex flex-col justify-items-center"
                  method="post"
                >
                  <h4 className="font-sans text-slate-600 text-xl ">email</h4>
                  <input
                    onChange={changeEmail}
                    className="rounded-md border-2 px-15 py-3 my-2 hover:border-slate-900 placeholder:italic placeholder:text-slate-40 block pl-2"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="email"
                  />
                  <h4 className="font-sans text-slate-600 text-xl">password</h4>
                  <input
                    onChange={changePassword}
                    className="rounded-md border-2 px-15 py-3 my-2 hover:border-slate-900 placeholder:italic placeholder:text-slate-40 block pl-2"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                  />
                </form>
                <Link
                  className="inline-block w-1/2	font-style: italic hover:font-bold  "
                  to="/forgetpassword"
                >
                  Forget Password?
                </Link>
                <button
                  onClick={loginHandler}
                  className="rounded-md bg-lime-500 py-3 mt-4 hover:bg-lime-600 active:bg-lime-700"
                >
                  Login
                </button>
                <p className="text-center text-slate-600">or</p>
                <button
                  onClick={() => {
                    setShow(false);
                  }}
                  className="rounded-md bg-lime-500 mt-4 hover:bg-lime-600 active:bg-lime-700"
                >
                  <Link to="/register" className="block h-full py-3">
                    Signup for Free
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </>,
      document.body
    )
  );
};

export default Modal;
