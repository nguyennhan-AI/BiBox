'use client';
import React from 'react';
import UploadButton from './UploadButton';
import Image from 'next/image';
import './Adjust.css'
const Sidebar = () => {
    return (
        <div className='sidebar w-full h-full  flex-col'>
            {/* Logo & Notification */}
            <div className='w-full h-[120px] flex items-center justify-between p-2 gap-2 mt-3'>
                <div className='h-[80px] items-center flex' ><img src="/home-avatar.png" alt="avatar" className='rounded-full h-[100px]'  /></div>
                <div className=' font1 h-full pt-3 font-semibold text-4xl'>BiBoxStorage</div>
                <div className='flex-col justify-end flex h-full'>
                    <div className='flex gap-2 '>
                        <div><img src="/home-bell.svg" alt="bell" className='h-[20px] w-[20px]'/></div>
                        <img src="heart-icon-1.svg" alt="avt" className='border rounded-xl h-[20px] w-[20px] '/>
                    </div>
                </div>

            </div>

            {/* Navigation */}
            <nav className='w-full h-[350px] items-center flex justify-center'>
                <ul className='w-[300px] h-auto flex-col '>
                    <div className="flex w-full h-[90px] items-center gap-3">
                        <button className="w-[140px] h-full  items-center justify-center flex gap-3 bg-white rounded-2xl hover:shadow-lg hover:bg-gray-100">
                            <div className='bg-[#7DAFAF] rounded-xl opacity-[70%]  p-2'><img src="/homeicon.svg" alt="homeicon" /></div>
                            <div>Home</div>
                        </button>
                        <button className="w-[140px] h-full  items-center justify-center flex gap-3 bg-white rounded-2xl hover:shadow-lg hover:bg-gray-100">
                            <div className='bg-[#7DAFAF] rounded-xl opacity-[70%]  p-2'><img src="/favoriteicon.svg" alt="homeicon" className='w-[24px] h-[24px]'/></div>
                            <div>Favourite</div>
                        </button>
                    </div>
                    <div className="flex w-full h-[90px] items-center gap-3 mt-4">
                        <button className="w-[140px] h-full  items-center justify-center flex gap-3 bg-white rounded-2xl hover:shadow-lg hover:bg-gray-100">
                            <div className='bg-[#7DAFAF] rounded-xl opacity-[70%]  p-2'><img src="/lockicon.svg" alt="homeicon" className='w-[24px] h-[24px]' /></div>
                            <div>Locker</div>
                        </button>
                        <button className="w-[140px] h-full  items-center justify-center flex gap-3 bg-white rounded-2xl hover:shadow-lg hover:bg-gray-100">
                            <div className='bg-[#7DAFAF] rounded-xl opacity-[70%]  p-2'><img src="/workspaceicon.svg" alt="homeicon" className='w-[24px] h-[24px]'/></div>
                            <div>Workspace</div>
                        </button>
                    </div>
                    <div className="flex w-full h-[90px] items-center gap-3 mt-4">
                        <button className="w-[140px] h-full  items-center justify-center flex gap-3 bg-white rounded-2xl hover:shadow-lg hover:bg-gray-100">
                            <div className='bg-[#7DAFAF] rounded-xl opacity-[70%] p-2'><img src="/binicon.svg" alt="homeicon" className='w-[24px] h-[24px]'/></div>
                            <div>Bin</div>
                        </button>
                    </div>
                </ul>
            </nav>

            {/* Cloud Pro Section */}
            <div className='w-full h-[150px] flex items-center justify-center mt-10'>
                <div className="relative w-[300px] h-[186px] rounded-3xl bg-white flex flex-col px-5 py-5 gap-4">
                    <div className='flex items-center w-[144px]'>
                        <div className='text-3xl  font-bold'>CloudPro</div>
                        <Image src="/blink.svg" alt="blink icon" width={35} height={35} className='' />
                    </div>
                    <div className='text-gray-400 font-semibold w-[60%]'>The only storage you need</div>
                    <UploadButton />
                    <img src="/homepic2.svg" alt="overlay"  style={{ width: "80%", height: "80%", position: "absolute", zIndex: 1, top:"70px",left:"150px" }}/>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

