import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import authServices from "../services/authServices";
import pictureService from "../services/pictureService";
import Picture from "../components/Picture";
import Loading from "../components/Loading";
import Loading02 from "../components/Loading02";

const Profile = ({ user, setUser }) => {
  let [profile, setProfile] = useState();
  let nevigate = useNavigate();
  let [isMe, setIsMe] = useState(false);
  let [uploadImg, setUploadImg] = useState();
  let { idFromParams } = useParams();
  let [hasProfile, setHasProfile] = useState(false);
  let [profileImg, setProfileImg] = useState();
  let [page, setPage] = useState(1);
  let [item, setItem] = useState([]);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);
  let [follow, setFollow] = useState(false);
  let defaultProfile = "/default_profile.jpg";
  const fetchData = () => {
    setError(null);
    pictureService
      .getByUserId(idFromParams, page)
      .then((data) => {
        setItem((prevItem) => [...prevItem, ...data.data]);
        setPage((prevPage) => prevPage + 1);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    if (user) {
      if (idFromParams == user.user._id) setIsMe(true);
      else {
        user.user.subscriber.forEach((id) => {
          id == idFromParams ? setFollow(true) : setFollow(false);
        });
      }
    }
    authServices
      .getUser(idFromParams)
      .then((res) => {
        setProfile(res.data);
        if (Object.hasOwn(res.data, "profile")) {
          setHasProfile(true);
          setProfileImg(pictureService.arrayBuffer(res.data.profile.data.data));
        }
      })
      .catch((e) => {
        console.log(e);
      });
    fetchData();
  }, [idFromParams]);

  const uploadHandle = (e) => {
    let file = e.target.files[0];
    setUploadImg(URL.createObjectURL(e.target.files[0]));
    authServices
      .uploadProfile(file, user.user._id)
      .then((res) => {
        console.log(res);

        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const followHandle = () => {
    setFollow(!follow);
    if (follow) {
      authServices
        .unFollow(idFromParams, user.user._id)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      authServices
        .follow(idFromParams, user.user._id) //edit here
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  console.log(profile);
  return (
    profile && (
      <main className="flex flex-col justify-center items-center min-h-screen ">
        {loading && <Loading02 />}
        <div className="w-2/3 flex flex-col items-center bg-white rounded-lg">
          <div className="flex w-full items-center justify-center mt-10">
            {isMe ? (
              <div className="border-2 border-gray-800 w-1/5 h-1/5 rounded-full bg-gray-500 group flex flex-col hover:opacity-60">
                <label htmlFor="upload file">
                  {hasProfile ? (
                    <img
                      className="max-w-full max-h-full aspect-square rounded-full bg-gray-500 cursor-pointer"
                      src={uploadImg ? uploadImg : profileImg}
                      alt="your profile"
                    />
                  ) : (
                    <img
                      className="max-w-full max-h-full aspect-square rounded-full bg-gray-500 cursor-pointer"
                      src={uploadImg ? uploadImg : defaultProfile}
                      alt="default profile"
                    />
                  )}
                </label>
                <input
                  className="hidden"
                  hidden=""
                  id="upload file"
                  type="file"
                  accept="image/*"
                  onChange={uploadHandle}
                />
              </div>
            ) : (
              <div className="border-2 border-gray-800 w-1/5 h-1/5 rounded-full bg-gray-500 group flex flex-col ">
                <label htmlFor="upload file">
                  {hasProfile ? (
                    <img
                      className="max-w-full max-h-full aspect-square rounded-full bg-gray-500 cursor-pointer"
                      src={profileImg}
                      alt="your profile"
                    />
                  ) : (
                    <img
                      className="max-w-full max-h-full aspect-square rounded-full bg-gray-500 cursor-pointer"
                      src={defaultProfile}
                      alt="default profile"
                    />
                  )}
                </label>
              </div>
            )}
          </div>
          <h1 className="text-3xl font-family: ui-sans-serif font-bold">
            {profile.username}
          </h1>
          <h2 className="text-gray-500">{profile.follower.length} followers</h2>
          {isMe && user && (
            <button
              onClick={() => {
                nevigate(`/profile/${user.user._id}/edit`);
              }}
              className="mt-2 rounded-full bg-emerald-500 text-white w-1/3  md:w-1/5 h-10 hover:bg-emerald-700 active:bg-emerald-900"
            >
              Edit Profile
            </button>
          )}
          {!isMe && (
            <button
              onClick={() => {
                followHandle();
              }}
              className="mt-2 rounded-full bg-emerald-500 text-white w-1/5 h-10 hover:bg-emerald-700 active:bg-emerald-900"
            >
              {follow ? "Unfollow" : "Follow"}
            </button>
          )}
          <h1 className="mt-3 font-family: ui-sans-serif font-bold">
            posted picture
          </h1>
          <section
            id="posted picture"
            className="mt-3 w-full border-t-4 border-gray-200 flex flex-wrap items-center justify-center"
          >
            {item &&
              item.map((data) => {
                return <Picture data={data} key={data._id} />;
              })}
            {loading && <Loading />}
          </section>
        </div>
      </main>
    )
  );
};

export default Profile;
