import React from 'react';


const FileHover = ({name}:{name:string|undefined}) => {
    return (
        
        <div className='flex items-center justify-between '>
            <div className='flex  gap-1 items-center'>
                <img src="/viewtree/file.svg" alt="" className='h-[35px] w-[35px]' />
                <div className="font-semibold">{name}</div>
            </div>
        </div>
    );
};

export default FileHover;