import React from 'react';
import FolderCard from './FolderCard';

const FolderList = () => {
    return (
        <div className='w-full h-full flex-col gap-1'>
            <div className="font1 w-full h-[32px] flex items-center  text-center text-3xl gap-1 ">
            <img src="home-folder-icon.svg" alt="homeicon" className='w-[35px] h-[35px]' />
            Folders
            <button className='w-[32px] bg-[#7DAFAF] rounded-full flex items-center justify-center ml-3'>
                <img src="/home-plus-icon.svg" alt="plus" />
            </button>
            </div>
            <div className='w-full h-[240px] flex items-center gap-3'> 
            <FolderCard title="Images" fileCount={1734430} lastEdit="May 3rd 2021" issecured = {true}/>
            <FolderCard title="Videos" fileCount={1734430} lastEdit="May 3rd 2021" issecured= {false}/>
            <FolderCard title="Audio" fileCount={1734430} lastEdit="May 3rd 2021" issecured={true}/>
            </div>
        </div>
    );
};

export default FolderList;