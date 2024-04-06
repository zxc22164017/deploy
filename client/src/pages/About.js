import React from "react";

const About = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="w-full md:w-2/3 flex flex-col items-center bg-white rounded-lg">
        <h1 className="font-bold text-6xl text-gray-900 my-2 text-center">
          About This Project
        </h1>
        <p className="text-slate-500 p-3 text-center ">
          This is a practice to try to make a MERN stack project from scratch by
          myself.
          <br />
          I use TailwindCss to do the styling
          <br />
          If you have any question, feel free to contact me at
          <br />
          asdzxc1234448@gmail.com
          {/* <br />I tried to use tailwindCss in this project. It's not bad I have
          to say but I found out that I'm not that used to it
          <br />
          It features in writing CSS in html file which is convienient but it
          makes codes hard to read as well.
          <br />
          The biggest problem I've encountered in this project is how to handle
          image.
          <br />
          I was trying to store images into mongoDB in the form of url.
          <br />
          But I found out I couldn't find a way to generate url so I decided to
          store images in another way, which is storing it directly into mongoDB
          in the form of bytes.
          <br />
          The process was smooth. I stored it into mongoDB successfully. Then, I
          encountered another problem.
          <br />
          That is, I couldn't convert it back to image again.
          <br />
          Well, still have a lot to say, but I'm tired now LAMO. */}
        </p>
      </div>
    </div>
  );
};

export default About;
