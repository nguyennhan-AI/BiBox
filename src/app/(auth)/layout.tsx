import Image from 'next/image';
import React from 'react';
import './Adjust-auth.css';
const layout = ({children}:{children: React.ReactNode}) => {
    return (
        <div className='grid grid-cols-10 h-screen '>
            <section className='col-span-7 h-full overflow-hidden '>
                <div className='h-[100px]'>
                    <div className="h-[50px] mt-5 ml-5 flex items-center space-x-2 ">
                        <div className='p-2 border border-teal-600 border-[2px]'><img src="/icon.png" alt="icon" className='h-[24px] w-[24px]'/></div>
                        <span className="text-gray-600 text-lg font-medium">BiBox</span>
                    </div>
                </div>
                {children}
            </section>
            <section className='col-span-3 background-auth flex items-center justify-center h-full overflow-hidden '>
                <div className=' flex-col items-center gap-3'>
                    <div className='text-white items-center justify-center flex text-[70px] font2'>New Here?</div>
                    <div className='items-center justify-center flex '>
                        <div className='text-gray-200 items-center justify-center flex font-semibold'>Sign up and discover a great amount of new opportunities!</div> 
                        </div>
                    <div className=' items-center justify-center flex h-[50px] font-semibold mt-10'>
                        <button className="bg-white text-gray-800 font-semibold py-2 px-20 rounded-full shadow-md hover:shadow-lg transition"> Sign Up</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default layout;