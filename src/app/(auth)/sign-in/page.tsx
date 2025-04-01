"use client";
import React, { useState } from "react";
import { FaGoogle, FaLinkedinIn, FaGithub } from "react-icons/fa";
import "./Adjust-auth.css";
import { useRouter } from "next/navigation";
import axios from "axios";
const SignIn = () => {
  const router = useRouter();
  const handleNavigate = () => {
    router.push("/sign-up");
  };
  const [confirm, setConfirm] = useState(false);
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const handleLogin = async () => {
    setConfirm(true);
    try {
      const res = await axios.post(
        "https://storage-app.spsohcmut.xyz/api/v1/auth/log-in",
        { email, password }
      );
      console.log("Checking request sent successfully!");
      console.log(res);
      router.push('/homepage')
    } catch (error) {
      console.error("Error signing in:", error);
    } finally {
      setConfirm(false);
      console.log(confirm);
    }
  };

  return (
    <div className="grid grid-cols-10 h-screen ">
      <section className="col-span-6 h-full overflow-hidden ">
        <div className="h-[100px]">
          <div className="h-[50px] mt-5 ml-5 flex items-center space-x-2 ">
            <div className="p-2 border border-teal-600 border-[2px]">
              <button  onClick={() => {
                router.push("/landing-page");
              }}><img src="/icon.png" alt="icon" className="h-[24px] w-[24px]" /></button>
            </div>
            <div
              className="text-gray-600 text-lg font-medium"
            >
              BiBox
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center min-h-screen">
          {/* Header */}
          <div className="items-center">
            <h2 className="text-7xl  font-semibold text-center text-gray-900">
              Login to Your Account
            </h2>
            <p className="text-gray-500 text-center mt-2">
              Login using social networks
            </p>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                className="p-3 bg-gray-700 text-white rounded-full"
                onClick={() =>
                  (window.location.href =
                    "https://github.com/login/oauth/authorize?client_id=Ov23liJ3ADLrxMEn5M9o&redirect_uri=http://localhost:3000/homepage&scope=read:user user:email")
                }
              >
                <FaGithub />
              </button>
              <button
                className="p-3 bg-red-500 text-white rounded-full "
                onClick={() =>
                  (window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=185040142880-e0o5rn2ms0d01vclb7ounj5n0i0a60he.apps.googleusercontent.com&redirect_uri=http://localhost:3000/homepage&response_type=code&scope=email profile&access_type=offline&prompt=consent`)
                }
              >
                <FaGoogle />
              </button>
              <button className="p-3 bg-gray-700 text-white rounded-full">
                <FaLinkedinIn />
              </button>
            </div>
          </div>
          <div className="flex items-center w-[60%] my-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          {/* Content */}
          <div className="flex-col flex w-[60%] gap-5">
            <div>
              <input
                type="text"
                placeholder="Email"
                autoComplete="off"
                className="w-full px-4 py-3 rounded-full bg-teal-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value = {email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                autoComplete="off"
                className="w-full px-4 py-3 rounded-full bg-teal-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value = {password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
          </div>
          {/* Footer */}
          <div className="flex items-center justify-center mt-5 w-[50%]">
            <button
              className="border px-20 py-3 bg-teal-700 text-white rounded-full hover:text-black hover:shadow-md"
              onClick={() => {
                handleLogin();
              }}
            >
              Sign in
            </button>
          </div>
        </div>
      </section>
      <section className="col-span-4 background-auth flex items-center justify-center h-full overflow-hidden  ">
        <div className=" flex-col items-center gap-3">
          <div className="text-white items-center justify-center flex text-[70px] font2">
            New Here?
          </div>
          <div className="items-center justify-center flex ">
            <div className="text-gray-200 items-center justify-center flex font-semibold">
              Sign up and discover a great amount of new opportunities!
            </div>
          </div>
          <div className=" items-center justify-center flex h-[50px] font-semibold mt-10">
            <button
              className="bg-white text-gray-800 font-semibold py-2 px-20 rounded-full shadow-md hover:shadow-lg transition"
              onClick={handleNavigate}
            >
              {" "}
              Sign Up{" "}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
