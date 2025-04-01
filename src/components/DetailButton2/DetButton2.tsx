"use client";

import {
  MessageSquare,
  Plus,
  PlusCircle,
  Lock,
  Info,
  Download,
  Trash2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreOutlined } from "@ant-design/icons";

import { useEffect, useState } from "react";
import FolderInfo from "./FolderInfo";
import axios from "axios";
import  PermissionCard from "./PermissionCard/PermissionCard";
import useStore from "../zustand/zustandstore";


interface selectedFolderPermissionInter{
  access_secure_file: boolean,
  can_share: true,
  file_id: string,
  permission_type: number,
  user: {
    email: string,
    first_name: string,
    image: string,
    last_name: string
  },
  user_id: string
}
interface ButtonProps{
  folderID:string
}
export const DetailButton2:React.FC<ButtonProps> = (folderID) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<FolderInfo | undefined>(undefined);
  const [selectedFolderPermission, setSelectedFolderPermission] = useState<selectedFolderPermissionInter[]>([]);
  const [parentFolderName,setParentFolderName] = useState('');
  const {setAct} = useStore();
  const openSidebar = () => {
    setIsSidebarOpen(true);
    setIsDropdownOpen(false); 
  };
  //set Dialog and Card

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };


  const handleItemSelect = () => {
    setIsDropdownOpen(false); 
  };

  useEffect(()=>{
    const handleOpen = async () => {
      try {
        const res = await axios.get(`https://storage-app.spsohcmut.xyz/api/v1/files/${folderID.folderID}/metadata`);
        setSelectedFolder(res.data.data);
  
        if(res.data.data.parent_folder_id!=undefined){
        const resp = await axios.get(`https://storage-app.spsohcmut.xyz/api/v1/files/${res.data.data.parent_folder_id}/metadata`);
        setParentFolderName(resp.data.data.name);
        }
  
        const res1 = await axios.get(`https://storage-app.spsohcmut.xyz/api/v1/files/${folderID.folderID}/permissions`);
        const permission = res1.data.data.permissions;
        setSelectedFolderPermission(permission || []);
        //
      } catch (error) {
        console.error("Error fetching file data:", error);
      }
    };
    handleOpen();
  },[folderID.folderID]);

  const handleDoubleClick = (e: React.MouseEvent)=>{
    e.stopPropagation();
  } 

  const handleDelete = async() =>{
    await axios.patch(`https://storage-app.spsohcmut.xyz/api/v1/files/${folderID.folderID}/soft-delete`)
    setAct();
  }
  
  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen} >
      <DropdownMenuTrigger asChild>
        <button>
          <MoreOutlined className="text-gray-500 text-lg hover:text-black cursor-pointer hover:rounded-lg hover:bg-gray-300" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" onDoubleClick={handleDoubleClick}>
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Info />
              <span>Info</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Info />
                  <button onClick={()=> {openSidebar();}}>See Folder Details</button>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={handleItemSelect}>
                  <MessageSquare />
                  <span>Message</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleItemSelect}>
                  <PlusCircle />
                  <span>More...</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem onSelect={handleItemSelect}>
            <Plus />
            <span>Add to workspace</span>
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleItemSelect}  className="hover:cursor-pointer">
            <Lock />
            <span>Lock this folder</span>
          </DropdownMenuItem>

        {/*Permission here*/ }

        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <PermissionCard folderId={selectedFolder?.id} folderName={selectedFolder?.name}></PermissionCard>
        </DropdownMenuItem>
        {/* */}


        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleItemSelect} className="hover:cursor-pointer">
          <Download/>
          <span>Download</span>
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={handleItemSelect} className="hover:cursor-pointer" onClick={handleDelete}>
          <Trash2 />
          <span>Add to Bin</span>
        </DropdownMenuItem>

      </DropdownMenuContent>
      <FolderInfo isOpen={isSidebarOpen} folderInfo={selectedFolder} onClose={closeSidebar} selectedFolderPermission={selectedFolderPermission} parentFolderName={parentFolderName }/>
    </DropdownMenu>
  );
}
export default DetailButton2;