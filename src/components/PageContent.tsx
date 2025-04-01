import React from 'react';
import './Adjust.css'
import FolderList from './Folder/FolderList';
import FileList from './File/FileList';

const PageContent = () => {
    return (
        <div className='w-full h-full min-h-screen flex-col gap-10 mx-5 mt-5 flex'>
            {/* //folder */}
            <FolderList/>
            {/* File */}
            <div>
            <FileList/>
            </div>       
        </div>
    );
};

export default PageContent;