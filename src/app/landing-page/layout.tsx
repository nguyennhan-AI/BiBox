'use client'
import React, { useEffect, useState } from 'react';
import { MoveRight } from 'lucide-react';
import { FaGithub,FaFacebookF} from "react-icons/fa";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
const Layout = () => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);    

    useEffect(() => {
        setIsClient(true); // Đánh dấu rằng client đã render

        const urlParams = new URLSearchParams(window.location.search);
        const authCode = urlParams.get("code");

        if (authCode) {
            console.log("Authorization Code:", authCode);

            // Gửi authCode về backend
            axios.post('https://storage-app.spsohcmut.xyz/api/v1/auth/confirm',
                {
                    code:authCode
                },
                {
                    withCredentials : true,
                }
            )
            .then(res =>{
                console.log(res)
            })

            // Xóa 'code' khỏi URL mà không reload trang
            window.history.replaceState(null, "", window.location.pathname);
        }
    }, []);

    // Tránh render component khi đang xử lý authCode để tránh lỗi hydration
    if (!isClient) return null;
    return (
        <div className="min-h-screen flex-col relative ">
            {/* Background Image */}
            <img
                src="/landingpage-bg.svg"
                alt="background"
                className="absolute inset-0 w-full h-full object-cover -z-10"
            />

            {/* Header */}
            <div className="w-full h-[100px] flex items-center justify-between p-10 relative z-10">
                <div className="flex items-center text-4xl font-semibold">
                    <div>Bi</div>
                    <div className="text-[#7DAFAF]">Box</div>
                </div>
                <img src="/landingpage-avt-1.jpg" alt="icon" className='w-[300px] h-[150px] '/>
                <img src="/landingpage-avt.svg" alt="icon" className='w-[70px] h-[70px]' />
                <img src="/landingpage-avt-2.jpg" alt="icon" className='w-[300px] h-[150px] '/>
                <button className="text-white text-xl " onClick={()=>router.push('/sign-in')}>Log In</button>
            </div>
        
            {/* Content */}
            <div className="flex-grow flex justify-end px-10 py-3 pb-10 relative z-10 ">
                {/* Left section with higher z-index */}
                <div className="flex-[3] py-[50px] left relative z-20">
                    <div className='bg-[#7DAFAF] h-full w-[150%] flex justify-center py-10  opacity-[80%]'>
                        <div className='w-full h-full flex flex-col justify-center px-12'>
                            <div className='h-full w-full py-20'>
                                <div className='text-white text-7xl font-semibold'> MANAGING</div>
                                <div className='text-white text-6xl font-semibold'> YOUR FILES</div>
                                <div className='text-white text-5xl font-semibold'> A BETTER WAY</div>
                            </div>
                            <div className='text-white text-1xl flex-col'>
                                <div>CONTACT WITH US : </div>
                                <div className='flex gap-1 items-center'>
                                    <FaFacebookF className='bg-gray-700 rounded-lg'></FaFacebookF>
                                    <Link className='flex gap-1 items-center hover:underline' href='https://www.facebook.com/bao.thai.5268'> https://www.facebook.com/bao.thai.5268</Link>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <FaGithub className='bg-gray-700 rounded-lg'/>
                                    <Link className='flex gap-1 items-center hover:underline' href='https://github.com/baothaihcmut'> baothaihcmut</Link>
                                    <div>/</div>
                                    <Link className='flex gap-1 items-center hover:underline' href='https://github.com/nguyennhan-AI'> nguyennhan-AI</Link>
                                </div>
                                <div className='flex'>READ MORE <MoveRight/></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right section with lower z-index */}
                <div className="flex-[7] right relative z-10 ">
                    <img src="/landingpage-bg1.jpg" alt="Background" className="w-full h-full object-cover" />
                </div>
                
            </div>
        </div>
    );
};

export default Layout;
