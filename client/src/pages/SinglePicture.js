import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import pictureService from "../services/pictureService";
import Comments from "../components/Comments";
import Comfirm from "../components/Confirm";
import authServices from "../services/authServices";

const SinglePicture = ({ user, setUser }) => {
  let [msg, setMsg] = useState("");
  let navigate = useNavigate();
  let { pictureId } = useParams();
  let [isMe, setIsMe] = useState(false);
  let [hasProfile, setHasProfile] = useState(false);
  let [profileImg, setProfileImg] = useState();
  let [pictureData, setPictureData] = useState();
  let [pictureImg, setPictureImg] = useState();
  let [page, setPage] = useState(1);
  let [comment, setComment] = useState([]);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);
  let [userProfile, setUserProfile] = useState();
  let defaultProfile = "/default_profile.jpg";
  let [reply, setReply] = useState("");
  let [like, setLike] = useState(false);
  let [show, setShow] = useState(false);
  let [follow, setFollow] = useState(false);
  const fetchData = () => {
    setLoading(true);
    setError(null);
    pictureService
      .getOne(pictureId, page)
      .then((res) => {
        setComment((prevComment) => [...prevComment, ...res.data.com]);
        setPictureData(res.data.pic);
        setPictureImg(
          pictureService.arrayBuffer(res.data.pic.picture.data.data)
        );
        let author = res.data.pic.author;
        if (author._id == user.user._id) setIsMe(true);
        if (Object.hasOwn(author, "profile")) {
          setHasProfile(true);
          setProfileImg(pictureService.arrayBuffer(author.profile.data.data));
        }

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
    if (user) {
      let currentUser = user.user;
      if (Object.hasOwn(currentUser, "profile")) {
        setUserProfile(
          pictureService.arrayBuffer(currentUser.profile.data.data)
        );
      }
    }
    fetchData();

    if (user) {
      for (let i = 0; i < user.user.like.length; i++) {
        if (user.user.like[i] == pictureId) {
          setLike(true);
        }
      }
    }
  }, []);

  const replyHandle = (e) => {
    e.preventDefault();
    pictureService
      .postComment(pictureId, reply)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((e) => {
        setMsg(e.response.data);
      });
  };

  let heartHandle = () => {
    if (like) {
      pictureService
        .dislike(pictureId)
        .then((res) => {
          // console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      pictureService
        .like(pictureId)
        .then((res) => {
          // console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    setLike(!like);
  };
  let deletePic = () => {
    setShow(true);
  };
  let editPic = () => {
    navigate(`/picture/${pictureId}/edit`);
  };
  const followHandle = () => {
    setFollow(!follow);
    if (follow) {
      authServices
        .unFollow(pictureData.author._id, user.user._id)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      authServices
        .follow(pictureData.author._id, user.user._id) //edit here
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    pictureData && (
      <main className=" flex  justify-center h-full min-h-screen ">
        <header className=" md:flex md:flex-row max-h-svh max-w-6xl content-stretch justify-stretch  ">
          <aside className="min-w-1/4 md:w-96   bg-white md:rounded-l-xl  flex flex-col p-3 basis-1/3">
            <div className="py-10 mb5">
              <h1 className="text-4xl font-bold text-emerald-700 dark:text-whit">
                {pictureData.title}
              </h1>
            </div>
            <div className="flex items-center flex-wrap ">
              {" "}
              {hasProfile ? (
                <img
                  onClick={() => {
                    navigate(`/profile/${pictureData.author._id}`);
                  }}
                  src={profileImg}
                  alt="profile"
                  className="w-12 h-12  rounded-full mx-2 inline-block hover:cursor-pointer hover:border-2 hover:border-slate-500 transition ease-in-out delay-150 hover:scale-110"
                />
              ) : (
                <img
                  onClick={() => {
                    navigate(`/profile/${pictureData.author._id}`);
                  }}
                  src="/default_profile.jpg"
                  alt="profile"
                  className="w-12 h-12  rounded-full mx-2 inline-block hover:cursor-pointe hover:border-2 hover:border-slate-500 transition ease-in-out delay-150 hover:scale-110"
                />
              )}
              <Link
                className="truncate ml-3 text-zinc-700  text-lg transition ease-in-out delay-150 hover:cursor-pointer  hover:underline hover:scale-110 "
                to={`/profile/${pictureData.author._id}`}
              >
                {pictureData.author.username}
              </Link>
            </div>
            <div className="flex items-center flex-wrap mt-4 ">
              <button
                onClick={followHandle}
                className="text-white rounded-lg w-16 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 active:duration-0 active:bg-blue-700 active:shadow-lg active:scale-100  "
              >
                {follow ? "unfollow" : "follow"}
              </button>
              <h5 className="ml-3 text-zinc-500 ">
                follower: {pictureData.author.follower.length}
              </h5>
            </div>

            <div className="flex mt-2 ">
              {user && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={like ? "red" : "none"}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke={like ? "red" : "currentColor"}
                  className="w-6 h-6 hover:w-7 hover:h-7 hover:cursor-pointer active:w-6 active-h-6 active:bg-red  "
                  onClick={heartHandle}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              )}
              {isMe && (
                <div className="flex">
                  <svg
                    onClick={deletePic}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 hover:w-7 hover:h-7 hover:cursor-pointer active:w-6 active-h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                  <svg
                    onClick={editPic}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 hover:w-7 hover:h-7 hover:cursor-pointer active:w-6 active-h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="mt-5">
              <h1 className="text-lg mb-2 text-zinc-700">Description:</h1>
              <p className="text-zinc-500 text-pretty  truncate hover:text-nowrap">
                {pictureData.description}
              </p>
            </div>
          </aside>
          <section className="min-w-1/2  bg-white  basis-1/2 flex justify-items-center align-center ">
            <img
              className="w-full h-auto max-w-6xl object-contain object-scale-down rounded-lg"
              src={pictureImg}
              alt="picture"
            />
          </section>
          <aside className="min-w-1/4 md:w-96 bg-white  md:rounded-r-xl basis-1/3 p-3 relative z-0">
            {msg && (
              <div className="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3">
                <p className="font-bold">{msg}</p>
              </div>
            )}
            <h1 className="text-lg mb-2 text-zinc-700">Comment:</h1>
            <div className="flex flex-col ">
              {comment &&
                comment.map((item) => {
                  return <Comments item={item} key={item._id} />;
                })}
            </div>
            <form className="sm:flex py-4 md:py-1 md:absolute md:bottom-4 md:mx-2">
              <div className="flex space-x-4">
                <div className="flex-shrink-0">
                  {" "}
                  {userProfile ? (
                    <img
                      src={userProfile}
                      alt="profile"
                      className="w-8 h-8  rounded-full mx-2 inline-block hover:cursor-pointer hover:border-2 hover:border-slate-500 transition ease-in-out delay-150 hover:scale-110"
                    />
                  ) : (
                    <img
                      src="/default_profile.jpg"
                      alt="profile"
                      className="w-8 h-8  rounded-full mx-2 inline-block hover:cursor-pointe hover:border-2 hover:border-slate-500 transition ease-in-out delay-150 hover:scale-110"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <input
                    onChange={(e) => {
                      setReply(e.target.value);
                    }}
                    type="text"
                    placeholder="reply"
                    className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  onClick={replyHandle}
                  className="px-2 py-1 bg-blue-400 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-600 active:bg-blue-900"
                >
                  Reply
                </button>
              </div>
            </form>
          </aside>
        </header>
        <Comfirm show={show} setShow={setShow} pictureId={pictureId} />
      </main>
    )
  );
};

export default SinglePicture;
