import { MoreOutlined } from '@ant-design/icons';
import React from 'react';

interface FileCardProps{
    filename:string;
    filetype:string;
    filestorage:string;
    filepreviewpicture:string;
    issecured:boolean;
}

const FileCard:React.FC<FileCardProps> = ({filename/*filetype*/,filestorage,/*filepreviewpicture*/issecured})  => {
    return (
        <div className='w-[350px] h-[170px] border-[3px] border-[#7DAFAF] rounded-2xl shadow-md flex justify-center cursor-pointer gap-2 bg-white hover:shadow-xl transition-all'>
            {/* preview */}
            <div className="flex justify-center items-center h-full w-[130px]"><img src="/homepic.svg" alt="preview" className='justify-center h-[120px] w-[120px]' /></div>
            <div className='flex flex-col justify-between '>
                <div className='flex-col h-[130px]'>
                    <div className='h-[30px] flex justify-end mt-1'>
                        {issecured && <img src="/lockericon.jpg" alt="locker" className='w-[30px]' />}
                    </div>
                    <div className='flex gap-2 items-center h-[90px]'>
                    <img src="home-folder-icon1.svg" alt="" />
                    <span className='font-semibold text-lg'>{filename}</span>
                </div>
                </div>
                <div className="flex justify-between gap-4 pb-1">
                    <div className='font-sans text-1xl items-center'>File Memory: {filestorage}</div>
                    <div className='flex gap-1'>
                        <div className='w-[25px] h-[25px] flex items-center justify-center bg-[#7DAFAF] rounded-lg hover:bg-[#5D8F8F]'>
                            <img src="/heart-icon-1.svg" alt="hearticon" className='h-[18px] h-[18px]'/>
                        </div>
                        <button><MoreOutlined className="text-gray-500 text-lg hover:text-black cursor-pointer hover:rounded-lg hover:bg-gray-300 "/></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileCard;