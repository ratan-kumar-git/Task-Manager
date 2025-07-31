import React, { useContext, useState } from "react";
import { validateEmail } from "../../utils/helper";
import Button from "../../components/buttons/button";
import Input from "../../components/inputs/input";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";
import { API_PATH } from "../../utils/apiPath";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import uploadImage from "../../utils/uploadImage";
import { UserContext } from "../../context/useContext";

const Signup = () => {
  const [profilrPic, setProfilrPic] = useState(null)
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("")

  const [error, setError] = useState("");

  const {updateUser} = useContext(UserContext)
  const navigate = useNavigate()

  const signupSubmitHandler = async (e) => {
    e.preventDefault();
    let profileImageUrl = ''
    if (!fullName) {
      setError("Please enter your full name");
      return;
    }
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }
    if (!password) {
      setError("Password length must be 8 character");
      return;
    }

    // api call
    try {
      // upload image if present 
      if (profilrPic){
        const imgUplodres = await uploadImage(profilrPic)
        profileImageUrl = imgUplodres.imageUrl || ""
      }
      const response = await axiosInstance.post(API_PATH.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
        adminInviteToken
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
  };

  return (
    <>
      <form onSubmit={signupSubmitHandler}>
        <div className="flex flex-col justify-center h-auto w-80 sm:w-96 p-10 bg-slate-400 shadow-xl rounded-lg">
          <h1 className="text-2xl text-center font-bold text-white mb-5">
            <a href="/" className="no-underline">
              <span className="text-red-500">Task</span>
              <span className="text-yellow-400">Manager</span>
            </a>
          </h1>
          <h1 className="text-2xl font-semibold font-serif text-left mb-5">
            Signup
          </h1>
          <div className="w-full flex items-center justify-center mb-5">
            <ProfilePhotoSelector image={profilrPic} setImage={setProfilrPic}/>
          </div>
          <Input
            type={"text"}
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            placeholder={"Ratan Kumar"}
            label={"Enter Your Name"}
          />
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
            type={"password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder={"Enter your password"}
            label={"Enter Your Password"}
          />
          <Input
            type={"text"}
            value={adminInviteToken}
            onChange={(e) => {
              setAdminInviteToken(e.target.value);
            }}
            placeholder={"6 Digit Code"}
            label={"Admin invite Token"}
          />
          
          <Button buttonText={"Signup"} />

          {error && <p className="text-red-500 text-base">{error}</p>}
          
          <p className="mb-2">
            I have already Account.{" "}
            <a href="/login" className="text-blue-600 underline">
              Login
            </a>
          </p>
        </div>
      </form>
    </>
  );
};

export default Signup;
