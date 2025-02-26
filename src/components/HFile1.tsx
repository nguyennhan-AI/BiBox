import { FolderFilled , MoreOutlined } from '@ant-design/icons';
import React from 'react';

const HFile1 = () => {
    return (
<div className="flex items-center justify-between w-[235px] h-[48px] px-3 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200">
    {/* Left Section: Folder Icon & Name */}
    <div className="flex items-center space-x-3">
        <FolderFilled className="text-gray-600 text-xl" />
        <span className="text-gray-800 font-medium">Nhan</span>
    </div>
    {/* Right Section: More Options */}
    <MoreOutlined className="text-gray-500 text-lg hover:text-black cursor-pointer hover:rounded-lg hover:bg-gray-300 "  />
</div>
    );
};

export default HFile1;