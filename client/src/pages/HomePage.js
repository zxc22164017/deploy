import React, { useState, useEffect } from "react";
import pictureService from "../services/pictureService";
import Picture from "../components/Picture";
import Loading from "../components/Loading";
import { Link, useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const HomePage = ({ user, setUser }) => {
  let [page, setPage] = useState(1);
  let [item, setItem] = useState([]);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);
  let [hasMore, setHasMore] = useState(true);
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
      <div className="h-80 relative  bg-white w-full  ">
        <img
          className="object-cover object-center w-full h-full "
          src="/01.gif"
          alt="test"
        />
        <div className="absolute w-full h-80 top-0 left-0 bg-black opacity-50">
          <h1 className="z-10 absolute inset-1/3 text-white text-center text-5xl opacity-100">
            Welcome to My Page
          </h1>
        </div>
      </div>
      <div className="my-3">{/* <h1>here to put tags</h1> */}</div>

      <section className="flex flex-wrap w-5/6 justify-center bg-white p-2 rounded-md">
        <InfiniteScroll
          className="flex flex-wrap justify-center"
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
