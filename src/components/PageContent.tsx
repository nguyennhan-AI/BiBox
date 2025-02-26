import React from 'react';
import './Adjust.css'
import FolderList from './FolderList';
import FileList from './FileList';

const PageContent = () => {
    return (
        <div className='w-full h-full flex-col gap-3 mx-5 mt-5'>
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