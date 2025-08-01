import React, { useState } from "react";
import Sidemenu from "./Sidemenu";
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  return (
    <>
      <div className="flex gap-5 bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
        <button
          className="block lg:hidden text-black"
          onClick={() => {
            setOpenSideMenu(!openSideMenu);
          }}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>
        <a href="/" className="no-underline text-xl font-bold bg-slate-200 px-4 py-1 rounded-lg">
          <span className="text-red-500">Task</span>
          <span className="text-yellow-400">Manager</span>
        </a>
        {openSideMenu && (
          <div className="fixed top-[68px] -ml-4 bg-white">
            <Sidemenu activeMenu={activeMenu} />
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
