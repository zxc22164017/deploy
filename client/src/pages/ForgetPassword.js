import React, { useState, useEffect } from "react";
import authServices from "../services/authServices";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirm, setConfirm] = useState("");

  let [msg, setMsg] = useState("");
  let navigate = useNavigate();

  let changeEmail = (e) => {
    setEmail(e.target.value);
  };
  let changePassword = (e) => {
    setPassword(e.target.value);
  };
  let changConfirm = (e) => {
    setConfirm(e.target.value);
  };

  useEffect(() => {
    password !== confirm
      ? setMsg("confirm password doesn't match password")
      : setMsg("");
  }, [password, confirm]);

  let handleSubmit = async (e) => {
    e.preventDefault();
    if (msg == "") {
      authServices
        .forgetPassword(email, password)
        .then((res) => {
          console.log(res);
          navigate("/");
        })
        .catch((e) => {
          setMsg(e.response.data);
        });
    }
  };

  return (
    <div className="px-4 py-20 flex item-center justify-center bg-gradient-to-b from-sky-200 to-fuchsia-200 w-screen min-h-screen">
      <form className="relative w-full max-w-sm p-10 h-max mx-auto bg-white rounded-md shadow-lg">
        {msg && (
          <div className="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3">
            <p className="font-bold">{msg}</p>
          </div>
        )}
        <div className="flex flex-col ">
          <h1 className="mb-2 text-2xl text-center text-slate-600">
            Reset Password
          </h1>

          <div className="relative border-black mt-1">
            <h1 className="absolute top-0 left-3.5 bg-white text-slate-500">
              Email
            </h1>
            <input
              onChange={changeEmail}
              type="email"
              className=" my-3.5 shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              placeholder="Email"
            />
          </div>
          <div className="relative border-black mt-1">
            <h1 className="absolute top-0 left-3.5 bg-white text-slate-500">
              password
            </h1>
            <input
              onChange={changePassword}
              type="password"
              className=" my-3.5 shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              placeholder="password"
            />
          </div>
          <div className="relative border-black mt-1">
            <h1 className="absolute top-0 left-3.5 bg-white text-slate-500">
              confirm password
            </h1>
            <input
              onChange={changConfirm}
              type="password"
              className=" my-3.5 shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirm"
              placeholder="confirm password"
            />
          </div>

          <div className="flex w-full items-center justify-center">
            <button
              onClick={handleSubmit}
              action="post"
              className="mt-2 rounded-full bg-green-500 text-white w-1/2 h-10 hover:bg-green-700 active:bg-green-900 "
            >
              Reset Password
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
