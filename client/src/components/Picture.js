import React, { useState, useEffect } from "react";
import pictureService from "../services/pictureService";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Picture = (prop) => {
  const { data } = prop;

  const author = data.author;
  const navigate = useNavigate();
  const [img, setImg] = useState();
  const [profile, setProfile] = useState();
  // let [like, setLike] = useState(false);

  useEffect(() => {
    setImg(pictureService.arrayBuffer(data.picture.data.data));
    if (Object.hasOwn(author, "profile"))
      setProfile(pictureService.arrayBuffer(author.profile.data.data));
  }, []);

  return (
    <div className="animate-fade-up animate-once mx-3 my-5 group bg-white border-1 border-gray-200 max-w-sm rounded md:max-w-64 h-min shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl hover:shadow-black/30">
      <div
        onClick={() => {
          navigate(`/picture/${data._id}`);
        }}
        className="hover:cursor-pointer relative"
      >
        {img && (
          <LazyLoadImage
            src={img}
            alt="image"
            className=" h-64 w-full rounded-md m-auto shadow-md  object-cover "
          />
        )}
        <div className="absolute z-10 bottom-0  w-full h-12 bg-gradient-to-t from-black from-40% via-70% to-none transition-opacity opacity-0 group-hover:opacity-70">
          <h1 className="z-12 w-1/2 text-xl font-bold text-white blur-none opacity-100 font-family:ui-sans-serif bottom-1 mx-2 absolute truncate ">
            {data.title}
          </h1>
          <div className=" absolute right-4 bottom-1 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-6 h-6 absolute bottom-0 right-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            <p className="text-white bottom-2">{data.like.length}</p>
          </div>
        </div>
        <div className="absolute">
          <div className="flex items-center py-2 justify-item-center">
            {profile ? (
              <LazyLoadImage
                src={profile}
                alt="profile"
                className="w-6 h-6  rounded-full mx-2 transition-all duration-100 ease-in hover:w-10 hover:h-10 hover:cursor-pointer"
                onClick={() => {
                  navigate(`/profile/${data.author._id}`);
                }}
              />
            ) : (
              <LazyLoadImage
                src="/default_profile.jpg"
                alt="profile"
                className="w-6 h-6  rounded-full mx-2 transition-all duration-100 ease-in hover:w-10 hover:h-10 hover:cursor-pointer"
                onClick={() => {
                  navigate(`/profile/${data.author._id}`);
                }}
              />
            )}
            <h5 className="px-2 truncate">{data.author.username}</h5>
          </div>
        </div>
      </div>
      <div className="animate-fade-up animate-once duration-300 ease-in-out hidden group-hover:block"></div>
    </div>
  );
};

export default Picture;
