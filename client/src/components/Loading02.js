import React from "react";

const Loading02 = (loading, setLoading) => {
  return (
    <div className="z-10 absolute top-0  w-full bg-black opacity-40 h-dvh">
      <div className="w-full h-screen flex items-center justify-center">
        <div
          className="z-10 inline-block h-14 w-14 animate-spin rounded-full border-4 border-solid border-white border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white opacity-100  "
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loading02;
