import React from "react";

interface FolderCardProps {
  title: string;
  fileCount: number;
  lastEdit: string;
  issecured: boolean;
}

const FolderCard: React.FC<FolderCardProps> = ({ title, fileCount, lastEdit,issecured }) => {
  return (
    <div className="w-[300px] h-[200px] rounded-2xl border border-gray-200 bg-[#7DAFAF] relative flex flex-col justify-between cursor-pointer">
      {/* Header */}
      <img
        src="/home-folder-background.svg"
        alt="overlay"
        className="absolute w-full h-full object-cover rounded-2xl "
      />
      <div className="flex  items-center justify-between p-2 relative">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8  rounded-lg flex items-center justify-center">
            <img src="/home-folder-icon4.svg" alt="icon" className="w-5 h-5" />
          </div>
          <span className="font-semibold text-lg">{title}</span>
        </div>
        <span className="text-gray-400 text-sm">{fileCount.toLocaleString()} Files</span>
      </div>
      {/* Center */}
      <div className="flex items-center justify-between p-2 relative">
        <div className="flex-col items-center space-x-2 w-[120px] ">
          <div className="text-gray-300 text-1xl">SharedWidth:</div>
          <div>avatar</div>
        </div>
        {issecured && (<div className="items-center">
          <img src="/lockericon.jpg " alt="locker" className="h-[100px] w-[120px]" />
        </div>)}
      </div>
      {/* Footer */}
      <div className="flex justify-between items-center text-gray-500 text-sm relative p-2">
        <span>Last Edit: {lastEdit}</span>
        <button className="text-black font-medium w-[100px]">Open</button>
      </div>
    </div>
  );
};

export default FolderCard;
