import React from "react";
import { LuLoader } from "react-icons/lu";

const LoadingAnimation = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <LuLoader className="animate-spin text-4xl text-gray-500" />
      <p className="text-gray-600 text-lg font-medium animate-pulse">
        Loading ...
      </p>
    </div>
  );
};

export default LoadingAnimation;
