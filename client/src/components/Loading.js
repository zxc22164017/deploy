import React from "react";

const Loading = (loading, setLoading) => {
  return (
    <div className="mx-2 my-3 group bg-white border-1 border-gray-200 w-sm rounded md:max-w-64 max-h-min shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl hover:shadow-black/30">
      <div className="animate-pulse">
        <div className="w-full h-full rounded-md m-auto  shadow-md bg-slate-200 " />
      </div>
      <div className="h-2 bg-slate-200 rounded"></div>
      <div className="flex items-center py-2 justify-item-center">
        <div className="w-8 h-8  rounded-full mx-2 bg-slate-200" />

        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
        <div className="hidden group-hover:block justify-self-end ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="gray"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="gray"
            className="w-6 h-6 hover:w-7 hover:h-7 active:w-6 active-h-6 active:bg-red "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Loading;
