import React, { useContext } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import { UserContext } from "../../context/useContext";

const UserDashboard = () => {
  useUserAuth();
  const { user } = useContext(UserContext);
  return <>
  
  <h1>UserDashboard</h1>
  {JSON.stringify(user)}
  </>;
};

export default UserDashboard;
