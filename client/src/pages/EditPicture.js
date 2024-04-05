import React, { useEffect, useState } from "react";
import pictureService from "../services/pictureService";
import { useNavigate, useParams } from "react-router-dom";

const EditPicture = ({ user, setUser }) => {
  let { pictureId } = useParams();
  let [msg, setMsg] = useState("");
  let [uploadImg, setUploadImg] = useState();

  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  const navigate = useNavigate();
  const fetchData = () => {
    pictureService
      .getOne(pictureId, 1)
      .then((res) => {
        setTitle(res.data.pic.title);
        setDescription(res.data.pic.description);
        setUploadImg(
          pictureService.arrayBuffer(res.data.pic.picture.data.data)
        );
      })
      .catch((e) => {});
  };

  let changeTitle = (e) => {
    setTitle(e.target.value);
  };
  let changeDescription = (e) => {
    setDescription(e.target.value);
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    pictureService
      .editPicture(pictureId, title, description)
      .then((res) => {
        navigate("/picture/" + pictureId);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="px-4 py-20 flex item-center justify-center bg-gradient-to-b from-sky-200 to-fuchsia-200 w-screen h-screen">
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
              Edit Picture
            </h1>

            <div className="flex items-center justify-center w-full">
              <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <img
                  className="max-w-full max-h-full cursor-pointer"
                  src={uploadImg}
                  alt="uploadImg"
                />
              </div>
            </div>

            <div className="relative border-black mt-1">
              <h1 className="absolute top-0 left-3.5 bg-white text-slate-500">
                title
              </h1>
              <input
                value={title}
                onChange={changeTitle}
                type="text"
                className=" my-3.5 shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                placeholder="title"
              />
            </div>

            <div className="relative border-black mt-1">
              <label
                htmlFor="description"
                className=" absolute top-0 left-3.5 bg-white text-slate-500 dark:text-white"
              >
                description
              </label>
              <textarea
                value={description}
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
                Update
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditPicture;
