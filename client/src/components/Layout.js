import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./NavBar/Nav";

const Layout = ({ user, setUser }) => {
  return (
    <div className="bg-gradient-to-b from-sky-200 to-fuchsia-200">
      <Nav user={user} setUser={setUser} />
      <Outlet />
    </div>
  );
};

export default Layout;
