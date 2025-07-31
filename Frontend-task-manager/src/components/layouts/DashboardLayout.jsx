import React, { act, useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { UserContext } from "../../context/useContext";
import Sidemenu from "./Sidemenu";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPath";

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
