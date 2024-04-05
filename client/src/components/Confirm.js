import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import pictureService from "../services/pictureService";

const Comfirm = (props) => {
  let { show, setShow, pictureId } = props;
  const navigate = useNavigate();
  let deleteProcess = () => {
    pictureService
      .deletePicture(pictureId)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
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
                <h1 className="font-sans font-bold text-center text-red-500 text-xl">
                  Are You Sure
                </h1>
                <p className="text-center text-red-700">
                  This will delete the post for good
                </p>
                <div className="flex justify-evenly mt-3">
                  <button
                    onClick={deleteProcess}
                    className="border-2 px-3 py-2 rounded-lg bg-green-500 hover:bg-green-600 active:bg-green-700"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => {
                      setShow(false);
                    }}
                    className="border-2 px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 active:bg-red-700"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>,
      document.body
    )
  );
};

export default Comfirm;
