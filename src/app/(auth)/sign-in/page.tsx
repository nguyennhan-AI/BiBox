'use client'
import React from 'react';
import { FaFacebookF, FaGoogle, FaLinkedinIn ,FaGithub} from "react-icons/fa";
const SignIn = () => {
    return (
        <div className='flex flex-col items-center min-h-screen'>
            {/* Header */}
            <div className="items-center">
                <h2 className="text-7xl  font-semibold text-center text-gray-900"> Login to Your Account</h2>
                <p className="text-gray-500 text-center mt-2">Login using social networks</p>
                <div className="flex justify-center space-x-4 mt-4">
                    <button className="p-3 bg-gray-700 text-white rounded-full" onClick={()=> window.location.href="https://github.com/login/oauth/authorize?client_id=Ov23liJ3ADLrxMEn5M9o&redirect_uri=http://localhost:3000/homepage&scope=read:user user:email"}>
                        <FaGithub />
                    </button>
                    <button className="p-3 bg-red-500 text-white rounded-full " onClick={()=> window.location.href=`https://accounts.google.com/o/oauth2/auth?client_id=185040142880-e0o5rn2ms0d01vclb7ounj5n0i0a60he.apps.googleusercontent.com&redirect_uri=http://localhost:3000/homepage&response_type=code&scope=email profile&access_type=offline&prompt=consent`}>
                        <FaGoogle />
                    </button>
                    <button className="p-3 bg-gray-700 text-white rounded-full" >
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
                <div >
                    <input type="text" placeholder='Email' className='w-full px-4 py-3 rounded-full bg-teal-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500'/>
                </div>
                <div >
                    <input type="text" placeholder='Password' className='w-full px-4 py-3 rounded-full bg-teal-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500'/>
                </div>
            </div>
            {/* Footer */}
            <div className='flex items-center justify-center mt-5 w-[50%]'>
                <button className='border px-20 py-3 bg-teal-700 text-white rounded-full hover:text-black hover:shadow-md'>Sign in</button>
            </div>
        </div>
    );
};

export default SignIn;