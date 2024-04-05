import React, { useState, useEffect } from "react";
import pictureService from "../services/pictureService";
import { useNavigate } from "react-router-dom";

const Picture = (prop) => {
  let { data } = prop;

  let author = data.author;
  let navigate = useNavigate();
  let [img, setImg] = useState();
  let [profile, setProfile] = useState();
  // let [like, setLike] = useState(false);

  useEffect(() => {
    setImg(pictureService.arrayBuffer(data.picture.data.data));
    if (Object.hasOwn(author, "profile"))
      setProfile(pictureService.arrayBuffer(author.profile.data.data));
  }, []);

  return (
    <div className=" mx-2 my-3 group bg-white border-1 border-gray-200 max-w-sm rounded md:max-w-64 max-h-min shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl hover:shadow-black/30">
      <div
        onClick={() => {
          navigate(`/picture/${data._id}`);
        }}
        className="hover:cursor-pointer"
      >
        {img && (
          <img
            src={img}
            alt="image"
            className="w-13 h-13 rounded-md m-auto  shadow-md "
          />
        )}
      </div>
      <h1 className=" text-xl font-bold font-family: ui-sans-serif mx-2">
        {data.title}
      </h1>
      <div className="flex items-center py-2 justify-item-center">
        {profile ? (
          <img
            src={profile}
            alt="profile"
            className="w-8 h-8  rounded-full mx-2 transition-all duration-100 ease-in hover:w-10 hover:h-10 hover:cursor-pointer"
            onClick={() => {
              navigate(`/profile/${data.author._id}`);
            }}
          />
        ) : (
          <img
            src="/default_profile.jpg"
            alt="profile"
            className="w-8 h-8  rounded-full mx-2 transition-all duration-100 ease-in hover:w-10 hover:h-10 hover:cursor-pointer"
            onClick={() => {
              navigate(`/profile/${data.author._id}`);
            }}
          />
        )}
        <h5 className="px-2 truncate">{data.author.username}</h5>
      </div>
      <div className="flex items-center mx-3 mb-2 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="red"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="red"
          className="w-6 h-6 inline-block"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
        <p>{data.like.length}</p>
      </div>
    </div>
  );
};

export default Picture;
