import React, { Fragment, useState, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate, useLocation, NavLink } from "react-router-dom";
import Modal from "./Modal";
import authServices from "../../services/authServices";
import pictureService from "../../services/pictureService";

const navigation = [
  { name: "Home Page", href: "/", current: false },
  { name: "About", href: "/about", current: false },
];

const Nav = ({ user, setUser }) => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  let navigate = useNavigate();
  let locat = useLocation();
  let [show, setShow] = useState(false);
  let [profileImg, setProfileImg] = useState();

  // const currentPage = () => {
  //   navigation.forEach((page) => {
  //     page.href == locat.pathname
  //       ? (page.current = true)
  //       : (page.current = false);
  //   });
  // };
  // useEffect(() => {
  //   currentPage();
  // }, [locat]);
  useEffect(() => {
    if (user) {
      let check = user.user;
      if (Object.hasOwn(check, "profile"))
        setProfileImg(pictureService.arrayBuffer(user.user.profile.data.data));
    }
  }, [profileImg]);
  const useModal = () => {
    setShow(true);
  };

  let [input, setInput] = useState("");

  let inputHandle = (e) => {
    setInput(e.target.value);
  };
  let searchHandle = () => {
    if (locat.pathname == "/search") {
      window.location.reload();
    }
    input == "" ? navigate("/") : navigate(`search/${input}`);
  };
  // window.addEventListener("keydown", (e) => {
  //   if (e.code == "Enter") {
  //     if (locat.pathname == "/search") {
  //       window.location.reload();
  //     }
  //     input == "" ? navigate("/") : navigate(`search/${input}`);
  //   }
  // });
  let logoutHandle = () => {
    authServices.logout();
    window.location.reload();
  };

  return (
    <div className="sticky top-0 z-50">
      <Disclosure
        as="nav"
        className="bg-gradient-to-r from-cyan-950 via-green-500 via-65% to-teal-700 sticky top-0"
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                <div className="hidden md:flex items-center justify-center ">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="h-8 w-auto "
                      src="/icon.png"
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {/* Link Direction */}
                      {navigation.map((item, index) => (
                        //Link
                        <NavLink
                          key={index}
                          to={item.href}
                          aria-current={item.current ? "page" : undefined}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-200 hover:text-black   ",
                            "block rounded-md px-3 py-2 text-base font-medium"
                          )}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
                <search className="hidden md:flex flex justify-self-center justify-center align-center w-1/3">
                  <input
                    type="text"
                    name="search"
                    className=" px-15 py-3 placeholder:italic placeholder:text-slate-400 block bg-gray-200 w-full border border-slate-300 rounded-md pl-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-950 focus:ring-2 sm:text-sm"
                    placeholder="Search for meme"
                    onChange={inputHandle}
                  />
                  <button
                    id="search"
                    onClick={searchHandle}
                    className="hover:bg-white hover:border hover:border-slate-300 hover:rounded-md active:border-slate-500 active:bg-slate-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 mx-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                      />
                    </svg>
                  </button>
                </search>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* smart phone search */}
                  <input
                    type="text"
                    name="search"
                    className=" md:hidden px-10 py-3 placeholder:italic placeholder:text-slate-400 block bg-gray-200 w-2/3 border border-slate-300 rounded-md pl-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-950 focus:ring-2 sm:text-sm sm:w-2"
                    placeholder="Search for meme"
                  />
                  <button
                    id="search"
                    className="hover:bg-white hover:border hover:border-slate-300 hover:rounded-md active:border-slate-500 active:bg-slate-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="md:hidden w-6 h-6 mx-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                      />
                    </svg>
                  </button>
                  {/* smart phone search end */}
                  <button
                    onClick={() => {
                      navigate("/uploadPicture");
                    }}
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">upload</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                      />
                    </svg>
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3 z-0">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        {/* userImg */}
                        {
                          <img
                            className="aspect-square rounded-full h-8 w-8"
                            src={
                              profileImg ? profileImg : "/default_profile.jpg"
                            }
                            alt="profile"
                          />
                        }
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="flex flex-col absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {user && (
                          <Menu.Item>
                            {({ active }) => (
                              //   popoutLink
                              <Link
                                to={`/profile/${user.user._id}`}
                                className={classNames(
                                  active ? "bg-gray-300" : "",
                                  "block px-4 py-2 text-sm text-gray-700 border-t-2 border-gray-300 border-collapse"
                                )}
                              >
                                Profile
                              </Link>
                            )}
                          </Menu.Item>
                        )}
                        {!user && (
                          <Menu.Item>
                            {({ active }) => (
                              //popoutLink
                              <Link
                                onClick={useModal}
                                className={classNames(
                                  active ? "bg-gray-300" : "",
                                  "block px-4 py-2 text-sm text-gray-700 "
                                )}
                              >
                                Log In
                              </Link>
                            )}
                          </Menu.Item>
                        )}
                        {!user && (
                          <Menu.Item>
                            {({ active }) => (
                              //popoutLink
                              <Link
                                to="/register"
                                className={classNames(
                                  active ? "bg-gray-300" : "",
                                  "block px-4 py-2 text-sm text-gray-700 border-b-2 border-gray-300 border-collapse"
                                )}
                              >
                                Sign Up
                              </Link>
                            )}
                          </Menu.Item>
                        )}
                        {user && (
                          <Menu.Item>
                            {({ active }) => (
                              //popoutLink
                              <Link
                                onClick={logoutHandle}
                                to="/"
                                className={classNames(
                                  active ? "bg-gray-300" : "",
                                  "block px-4 py-2 text-sm text-gray-700 border-b-2 border-gray-300 border-collapse"
                                )}
                              >
                                Log out
                              </Link>
                            )}
                          </Menu.Item>
                        )}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 flex flex-col border-collapse border-y-2 ">
                {navigation.map((item, index) => (
                  //Link
                  <Link
                    key={index}
                    to={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-200 hover:text-black   ",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Modal show={show} setShow={setShow} user={user} setUser={setUser} />
    </div>
  );
};

export default Nav;
