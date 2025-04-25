"use client";
import React from "react";
import { motion } from "framer-motion";
import "./Adjust-auth.css";
import { useState, } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { AlertSignUp } from "@/components/AlerSignUp/AlertSignUp";
import axios from 'axios';
import Image from "next/image";


const SignUp = () => {
    const [showPass1,setShowPass1] = useState(false);
    const [showPass2,setShowPass2] = useState(false);
    const router = useRouter();
    const [sendMail, setSendmail] = useState(false);
    const [email,setEmail] = useState('');
    const [password,setPassword]= useState('');
    const [repeat_password,setRep_Password]= useState('');
    const [first_name,setFirst_Name] = useState('');
    const [last_name,setLast_Name] = useState('');

    const handleSignUp = async () => {
      setSendmail(true);
            try {
              const res = await axios.post("https://storage-app.spsohcmut.xyz/api/v1/auth/sign-up",
              {email,first_name,last_name,password,repeat_password}
            );
              console.log("Sign-up request sent successfully!");
              console.log(res);
            }catch (error) {
              console.error("Error signing up:", error);
            }finally{
              setSendmail(false);
              console.log(sendMail);
            }
          };

  return (
    <div className="grid grid-cols-10 h-screen">
      <section className="col-span-6 h-full overflow-hidden">
        <div className="h-[100px]">
          <div className="h-[50px] mt-5 ml-5 flex items-center space-x-2">
            <div className="p-2 border-teal-600 border-[2px]">
            <Image src="/icon.png" height={24} width={24} alt="pic"></Image>
            </div>
            <button className="text-gray-600 text-lg font-medium" onClick={()=>{router.push('/landing-page')}}>BiBox</button>
          </div>
        </div>
      </section>

      <motion.section
        initial={{ x: "0%" }}
        animate={{ x: "-70%" }}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
        className="col-span-4 background-auth h-full overflow-hidden"
      >
        <div className="w-full h-full p-5">
            <div className="w-full h-full border-white border-[4px] flex-col flex gap-2 justify-between">
                <div className="flex-[3] text-3xl flex justify-center items-center text-white">Create your BiAccount</div>
                <div className="flex-[7] p-2 flex flex-col gap-1">
                    <div className="">Account Name:</div>
                    <input type="text" name="" className="rounded-md h-[30px]" placeholder="Email..." value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <div className="w-full flex justify-between gap-2">
                      <div className="w-full flex flex-col">
                        <div>First name:</div>
                        <input type="text" name="" className="rounded-md h-[30px] w-[70%]" placeholder="" value={first_name} onChange={(e)=>setFirst_Name(e.target.value)}/>
                      </div>
                      <div className="w-full flex flex-col">
                        <div>Last name:</div>
                        <input type="text" name="" className="rounded-md h-[30px] w-[70%]" placeholder="" value={last_name} onChange={(e)=>setLast_Name(e.target.value)}/>
                      </div>
                    </div>
                    <div className="">Password:</div>
                    <div className="flex justify-between  rounded-lg gap-1">
                        <input type={showPass1 ? "text" : "password"} name="" id="" className="!important rounded-md w-full h-[30px] " placeholder="Password..." value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                        <button onClick={()=>setShowPass1(!showPass1)}>{showPass1 ?<FontAwesomeIcon icon={faEye}/>:<FontAwesomeIcon icon={faEyeSlash}/>}</button>
                    </div>
                    <div className="">Confirmed Password:</div>
                    <div className="flex justify-between  rounded-lg">
                        <input type={showPass2 ? "text" : "password"} name="" id="" className="!important rounded-md w-full h-[30px] "value={repeat_password} onChange={(e)=>setRep_Password(e.target.value)}></input>
                        <button onClick={()=>setShowPass2(!showPass2)}>{showPass2 ?<FontAwesomeIcon icon={faEye}/>:<FontAwesomeIcon icon={faEyeSlash}/>}</button>
                    </div>
                    <div className="flex items-center justify-center mt-10 ">
                        <div onClick={()=>handleSignUp()}><AlertSignUp></AlertSignUp></div>
                    </div>
                </div>
            </div>
        </div>
      </motion.section>
    </div>
  );
};

export default SignUp;
