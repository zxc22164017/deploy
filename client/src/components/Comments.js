import React, { useState, useEffect } from "react";
import pictureService from "../services/pictureService";

const Comments = ({ item }) => {
  let [userProfile, setUserProfile] = useState();
  useEffect(() => {
    let author = item.author;
    if (Object.hasOwn(author, "profile"))
      setUserProfile(pictureService.arrayBuffer(item.author.profile.data.data));
  }, []);

  return (
    <div className="flex space-x-4 border-b-2 border-gray-300 animate-fade-left animate-once animate-duration-500 animate-delay-500 animate-ease-in-out ">
      <div className="flex-shrink-0">
        {userProfile ? (
          <img
            src={userProfile}
            alt="profile"
            className="w-8 h-8  rounded-full mt-2 inline-block hover:cursor-pointer hover:border-2 hover:border-slate-500 transition ease-in-out delay-150 hover:scale-110"
          />
        ) : (
          <img
            src="/default_profile.jpg"
            alt="profile"
            className="w-8 h-8  rounded-full mt-2 inline-block hover:cursor-pointe hover:border-2 hover:border-slate-500 transition ease-in-out delay-150 hover:scale-110"
          />
        )}
      </div>
      <div>
        <div className="text-gray-700 font-semibold flex-wrap">
          {item.author.username}
        </div>
        <p className="text-gray-600 text-wrap text-clip break-words">
          {item.comment}
        </p>
      </div>
    </div>
  );
};

export default Comments;
