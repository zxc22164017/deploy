import React, { useState, useEffect } from "react";
import pictureService from "../services/pictureService";
import Picture from "../components/Picture";
import Loading from "../components/Loading";
import { Link, useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const HomePage = ({ user, setUser }) => {
  const [page, setPage] = useState(1);
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const location = useLocation();
  const fetchData = () => {
    setLoading(true);
    setError(null);
    pictureService
      .getAll(page)
      .then((data) => {
        if (data.data.length == 0) {
          setHasMore(false);
        }
        setItem((prevItem) => [...prevItem, ...data.data]);
        setPage(page + 1);
      })
      .catch((e) => {
        console.log(e);
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  console.log(page);
  // useEffect(() => {
  //   window.scrollTo({ top: 0 });
  //   fetchData();
  // }, []);

  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <div className="animate-fade-right animate-once h-80 relative self-start  bg-white w-full h-dvh ">
        <img
          className=" object-cover object-center w-full h-full "
          src="/01.gif"
          alt="test"
        />
        <div className="animate-jump-in animate-once animate-delay-300 absolute w-full h-full top-0 left-0 bg-black opacity-50">
          <h1 className="z-10 absolute bottom-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center text-xl md:text-5xl opacity-100">
            Welcome to My Page
          </h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="absolute w-11 h-11 z-11 bottom-20 left-1/2  -translate-x-1/2 -translate-y-1/2 animate-bounce animate-infinite"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div className="my-3">{/* <h1>here to put tags</h1> */}</div>

      <section className="flex flex-wrap w-5/6 justify-center bg-white p-2 rounded-md overflow-hidden">
        <InfiniteScroll
          className="flex flex-wrap justify-center overflow-hidden"
          dataLength={item.length}
          next={fetchData}
          hasMore={hasMore} // Replace with a condition based on your data source
          loader={loading && <Loading />}
          endMessage={
            <h1 className="justify-self-end self-end z-50">
              No more items to load.
            </h1>
          }
        >
          {item &&
            !user &&
            item.map((data, index) => {
              return <Picture data={data} key={data._id + index} />;
            })}
          {item &&
            user &&
            item.map((data, index) => {
              return (
                <Picture
                  data={data}
                  userLike={user.user.like}
                  key={data._id + index}
                />
              );
            })}
        </InfiniteScroll>
      </section>
    </main>
  );
};

export default HomePage;
