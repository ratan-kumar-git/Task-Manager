import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import { UserContext } from "../../context/useContext";
import Sidemenu from "./Sidemenu";


const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <>
      <div className="">
        <Navbar activeMenu={activeMenu} />

        {user && (
          <div className="flex">
            <div className="max-[1080px]:hidden">
              <Sidemenu activeMenu={activeMenu} />
            </div>
            <div className="grow mx-5">{children}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardLayout;
