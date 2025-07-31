import React, { useState } from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const toggleShowPassword = () => {
    setIsPasswordShow(!isPasswordShow);
  };
  return (
    <>
      <label htmlFor={label} className="text-lg font-normal mb-1">
        {label}
      </label>
      <div className="flex justify-between items-center">
        <input
          type={
            type == "password" ? (isPasswordShow ? "text" : "password") : "text"
          }
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="px-3 py-2 rounded-md mb-5 w-full"
        />

        {type == "password" && (
          <>
            {isPasswordShow ? (
              <FaEyeSlash
                className="text-xl ml-2 mb-5"
                onClick={toggleShowPassword}
              />
            ) : (
              <FaRegEye
                className="text-xl ml-2 mb-5"
                onClick={toggleShowPassword}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Input;
