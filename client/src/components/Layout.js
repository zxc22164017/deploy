import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./NavBar/Nav";

const Layout = ({ user, setUser }) => {
  return (
    <div className="">
      <Nav user={user} setUser={setUser} />
      <Outlet />
    </div>
  );
};

export default Layout;
