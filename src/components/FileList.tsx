import React from 'react';
import FileCard from './FileCard';

const FileList = () => {
    return (
        <div className='w-full h-full flex-col gap-1'>
            <div className="font1 w-full h-[32px] flex items-center text-center text-3xl">
            <img src="file-icon.svg" alt="homeicon" className='h-[35px] w-[35px]' />
            Files
            </div>
            <div className='w-full h-[240px] flex items-center gap-3'> 
            <FileCard filename="Du Ma may Bao" filestorage="16KB" issecured = {true} />
            <FileCard filename="Du Ma may Ta" filestorage="20KB" issecured = {true} />
            <FileCard filename="Du Ma may Hung" filestorage="18MB" issecured = {false}  />
            </div>
        </div>
    );
};

export default FileList;