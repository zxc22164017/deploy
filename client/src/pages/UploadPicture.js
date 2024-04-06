import React, { useState } from "react";
import pictureService from "../services/pictureService";
import { useNavigate } from "react-router-dom";
import Loading02 from "../components/Loading02";

const UploadPicture = ({ user, setUser }) => {
  let [msg, setMsg] = useState("");
  let [loading, setLoading] = useState(false);
  let [uploadImg, setUploadImg] = useState();
  let [title, setTitle] = useState("");
  let [uploadFile, setuploadFile] = useState();
  let [description, setDescription] = useState("");
  const navigate = useNavigate();
  let changeTitle = (e) => {
    setTitle(e.target.value);
  };
  let changeDescription = (e) => {
    setDescription(e.target.value);
  };

  const uploadHandle = (e) => {
    if (e.target.files[0]) {
      setuploadFile(e.target.files[0]);
      setUploadImg(URL.createObjectURL(e.target.files[0]));
    }
  };

  let handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    pictureService
      .upload(uploadFile, title, description)
      .then((res) => {
        console.log(res);
        window.alert("upload successfully");
        navigate("/");
      })
      .catch((e) => {
        setMsg(e.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="px-4 py-20 flex item-center justify-center bg-gradient-to-b from-sky-200 to-fuchsia-200 w-screen h-screen">
      {loading && <Loading02 />}
      {!user && (
        <h1 className="text-3xl text-center">
          You need to login to upload picture
        </h1>
      )}
      {user && (
        <form className="relative w-full max-w-sm p-10 h-max mx-auto bg-white rounded-md shadow-lg">
          {msg && (
            <div className="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3">
              <p className="font-bold">{msg}</p>
            </div>
          )}
          <div className="flex flex-col ">
            <h1 className="mb-2 text-2xl text-center text-slate-600">
              Upload Your Picture Now
            </h1>

            <div className="flex items-center justify-center w-full">
              <label
                onChange={uploadHandle}
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                {uploadImg ? (
                  <img
                    className="max-w-full max-h-full cursor-pointer"
                    src={uploadImg}
                    alt="uploadImg"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG,GIF, JPG (MAX. 15MB)
                    </p>
                  </div>
                )}
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>

            <div className="relative border-black mt-1">
              <h1 className="absolute top-0 left-3.5 bg-white text-slate-500">
                title
              </h1>
              <input
                onChange={changeTitle}
                type="text"
                className=" my-3.5 shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white dark:bg-black text-nowrap"
                id="title"
                placeholder="title"
              />
            </div>

            <div className="relative border-black mt-1">
              <label
                htmlFor="description"
                className=" absolute top-0 left-3.5 bg-white text-slate-500 dark:text-white dark:bg-black text-nowrap"
              >
                description
              </label>
              <textarea
                onChange={changeDescription}
                id="description"
                rows="4"
                className=" my-3.5 block shadow appearance-none p-2.5 w-full text-sm text-gray-700  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your description here..."
              ></textarea>
            </div>

            <div className="flex w-full items-center justify-center">
              <button
                onClick={handleSubmit}
                action="post"
                className="mt-2 rounded-full bg-green-500 text-white w-1/2 h-10 hover:bg-green-700 active:bg-green-900 "
              >
                Upload
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default UploadPicture;
