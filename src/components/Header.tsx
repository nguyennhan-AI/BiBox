import React from 'react';
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input"
import './Adjust.css'
import { CaretDownOutlined } from '@ant-design/icons';
const Header = () => {
    return (
        <div className="header flex items-center rounded-2xl justify-center py-5 ">
            <div className="search flex  w-[85%] h-[85%]  rounded-3xl shadow-lg "  >
                <div className="searchbar flex-col w-[64%] h-full rounded-tl-2xl rounded-bl-2xl " >
                    <div className='font-semibold text-[30px] w-full px-5 py-5'>Wanna Find something? </div>
                    <div className='flex items-center bg-white rounded-lg ml-5'>
                        <Search className='text-gray-700'></Search>
                        <Input className='bg-transparent outline-none border-none px-3 text-gray-700 focus:outline-none focus:ring-0' type='text' placeholder='Search in BiStorage'></Input>
                    </div>
                    <div className='w-full items-center px-5 py-5 flex gap-3'>
                        <button className=" w-[152px] h-[48px]  ">
                            <div className='SortButton text-white '>Type <CaretDownOutlined className='text-white '/></div>
                        </button>
                        <button className=" w-[152px] h-[48px] ">
                            <div className='SortButton  text-white  '>Person <CaretDownOutlined className='text-white '/></div>
                        </button>
                        <button className="w-[240px] h-[48px] ">
                            <div className='SortButton  text-white  '>Recently Modified <CaretDownOutlined className='text-white '/></div>
                        </button>
                        <button className="w-[152px] h-[48px] ">
                            <div className='SortButton text-white ' >Source <CaretDownOutlined className='text-white '/></div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;