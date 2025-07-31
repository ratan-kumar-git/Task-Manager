import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Input from "../../components/inputs/input";
import Button from "../../components/buttons/button";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPath";
import { UserContext } from "../../context/useContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const {updateUser} = useContext(UserContext)
  const navigate = useNavigate()

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }
    if (!password) {
      setError("Please enter a valid password");
      return;
    }

    // api call
    try {
      const response = await axiosInstance.post(API_PATH.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, role } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data)

        // redirect based on role
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }

    setError("");
    setEmail("");
    setPassword("");
  };
  return (
    <>
      <form onSubmit={loginSubmitHandler}>
        <div className="flex flex-col justify-center h-auto w-80 sm:w-96 p-10 bg-slate-400 shadow-xl rounded-lg">
          <h1 className="text-2xl text-center font-bold text-white mb-5">
            <a href="/" className="no-underline">
              <span className="text-red-500">Task</span>
              <span className="text-yellow-400">Manager</span>
            </a>
          </h1>
          <h1 className="text-2xl font-semibold font-serif text-left mb-5">
            Login
          </h1>
          <Input
            type={"email"}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder={"demo@gmail.com"}
            label={"Enter Your Email"}
          />

          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={"Enter your password"}
            type={"password"}
            label={"Enter Your Password"}
          />

          <Button buttonText={"Login"} />

          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

          <p className="mt-2">
            I don't have Account.{" "}
            <a href="/signup" className="text-blue-600 underline">
              Signup
            </a>
          </p>
        </div>
      </form>
    </>
  );
};

export default Login;
