import React, { useState, useEffect } from "react";
import pictureService from "../services/pictureService";
import Picture from "../components/Picture";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

const SearchPage = () => {
  let { keyword } = useParams();

  let [page, setPage] = useState(1);
  let [item, setItem] = useState([]);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);

  const fetchData = () => {
    setLoading(true);
    setError(null);
    pictureService
      .search(keyword, page)
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
    fetchData();
    console.log(item);
  }, [keyword]);

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <div className="my-3">
        <h1 className="text-5xl font-family: ui-serif ">
          Some result with {keyword}
        </h1>
      </div>
      <div>{/* <h1>here to put tags</h1> */}</div>

      <section className="flex flex-wrap w-5/6 justify-center">
        {item &&
          item.map((pic) => {
            return <Picture data={pic} key={pic._id} />;
          })}
        {loading && <Loading />}
      </section>
    </main>
  );
};

export default SearchPage;
