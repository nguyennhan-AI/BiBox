'use client';
import PageContent from '@/components/PageContent';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { Toaster } from  'sonner';

const page = () => {
    // const [isClient, setIsClient] = useState(false); // Kiểm soát trạng thái client-side

    // useEffect(() => {
    //     setIsClient(true); // Đánh dấu rằng client đã render

    //     const urlParams = new URLSearchParams(window.location.search);
    //     const authCode = urlParams.get("code");

    //     if (authCode) {
    //         console.log("Authorization Code:", authCode);

    //         // Gửi authCode về backend
    //         axios.post('https://storage-app.spsohcmut.xyz/api/v1/auth/exchange',
    //             {
    //                 auth_code : authCode,
    //                 provider: 1
    //             },
    //             {
    //                 withCredentials : true,
    //             }
    //         )
    //         .then(res =>{
    //             console.log(res)
    //         })

    //         // Xóa 'code' khỏi URL mà không reload trang
    //         window.history.replaceState(null, "", window.location.pathname);
    //     }
    // }, []);

    // // Tránh render component khi đang xử lý authCode để tránh lỗi hydration
    // if (!isClient) return null;

    return (
        <div className="main-content"><PageContent />        <Toaster richColors></Toaster></div> 

    );
};

export default page;