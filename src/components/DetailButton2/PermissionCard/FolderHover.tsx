import React from 'react';

const FolderHover = ({name}:{name:string|undefined}) => {
    return (
        <div className='flex items-center justify-between gap-6 '>
            <div className='flex gap-1 items-center'>
                <img src="/viewtree/folder.svg" alt="" className='h-[35px] w-[35px]' />
                <div className="font-semibold">{name}</div>
            </div>
        </div>
    );
};

export default FolderHover;