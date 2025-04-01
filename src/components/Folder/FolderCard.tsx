import React from "react";
import { useRouter } from "next/navigation";
import "./Adjust.css" ;
import DetailButton2 from "../DetailButton2/DetButton2";

interface FolderCardProps {
  foldername: string;
  created_at: string;
  is_secured: boolean;
  folderId: string
}

const FolderCard: React.FC<FolderCardProps> = ({ foldername,created_at,is_secured,folderId}) => {
  const router = useRouter();
  const handleDoubleCLick = () => {
    router.push(`/homepage/folders/${folderId}`)
  };

  return (
    <div className="w-[300px] h-[200px] rounded-2xl border border-gray-200 bg-[#7DAFAF] relative flex flex-col justify-between cursor-pointer select-none hover:shadow-lg" onDoubleClick={handleDoubleCLick}  >
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
          <span className="font-semibold text-lg">{foldername}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
            <div className="text-[#366666] text-1xl">Owned:</div>
            <img src="/home-avatar.png" alt="" className="h-[35px] w-[35px] rounded-full"/>
          </div>
      </div>
      {/* Center */}
      <div className="flex items-center justify-between p-2 relative">
        <div className="flex-col items-center justify-center flex space-x-2 w-[120px] ">
          <div className="text-gray-300 text-1xl">SharedWidth:</div>
          <div className="flex">
          <img src="/home-avatar.png" alt="" className="h-[35px] w-[35px] rounded-full -ml-3"/>
          <img src="/home-avatar.png" alt="" className="h-[35px] w-[35px] rounded-full -ml-3"/>
          <img src="/home-avatar.png" alt="" className="h-[35px] w-[35px] rounded-full -ml-3"/>
          <img src="/home-avatar.png" alt="" className="h-[35px] w-[35px] rounded-full -ml-3"/>
          </div>

        </div>
        {is_secured && (<div className="items-center">
          <img src="/lock.png " alt="locker" className="h-[100px] w-[120px]" />
        </div>)}
      </div>
      {/* Footer */}
      <div className="flex justify-between items-center text-gray-500 text-sm relative p-2">
        <span>Created At: {created_at.slice(0,10)}</span>
        <div className="flex gap-2">
          <div className="text-black font-thin"> Open</div>
        <div className='groupFolder'><DetailButton2 folderID = {folderId}/></div>
        </div>

      </div>
    </div>
  );
};

export default FolderCard;
