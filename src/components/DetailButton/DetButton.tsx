"use client";

import {
  MessageSquare,
  Plus,
  PlusCircle,
  Lock,
  Info,
  Download,
  Trash2,
  PanelsTopLeft,
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
import FileInfo from "./FileInfo";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { PermissionCard } from "./PermissionCard/PermisstionCard1";
import useStore from "../zustand/zustandstore";


interface selectedFilePermissionInter{
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
  fileID:string
}
export const DetailButton:React.FC<ButtonProps> = (fileID) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileInfo | null>(null);
  const [selectedFilePermission, setSelectedFilePermission] = useState<selectedFilePermissionInter[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const [parentFolderName,setParentFolderName] = useState('');
  const {setAct} = useStore();
  const router = useRouter()

  useEffect(()=>{
    const handleOpen = async () => {
      try {
        const res = await axios.get(`https://storage-app.spsohcmut.xyz/api/v1/files/${fileID.fileID}/metadata`);
        //take metadata
        setSelectedFile(res.data.data);
        
        if(res.data.data.parent_folder_id!=undefined){
        const resp = await axios.get(`https://storage-app.spsohcmut.xyz/api/v1/files/${res.data.data.parent_folder_id}/metadata`);
        setParentFolderName(resp.data.data.name);
        }
  
        const res1 = await axios.get(`https://storage-app.spsohcmut.xyz/api/v1/files/${fileID.fileID}/permissions`);

        const permission = res1.data.data.permissions;
        setSelectedFilePermission(permission || []);
      } catch (error) {
        console.error("Error fetching file data:", error);
      }
    };
    handleOpen();
  },[fileID.fileID]);

  const handlePreview = async () => {
    try{
      const res = await axios.get(`https://storage-app.spsohcmut.xyz/api/v1/files/${fileID.fileID}/download-url`,{
        params:{
          preview : true
        }
      });
  const url = res.data.data.url;
  router.push(url);
    }catch (error) {
      console.error("Error fetching file data:", error);
    }
  };


  const handleDownload = async () => {
    try {
      const res = await axios.get(`https://storage-app.spsohcmut.xyz/api/v1/files/${fileID.fileID}/download-url`, {
        params: { preview: false }
      });
      const url = res.data.data.url;
      const file_name = res.data.data.file_name;
  
      // Tải file từ URL
      const fileResponse = await fetch(url);
      const blob = await fileResponse.blob();
  
      // Tạo link tải xuống
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', file_name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      // Giải phóng URL object
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error fetching file data:", error);
    }
  };

  const closeDropdown = () => {
    setIsDropdownOpen(true); // đúng là set false để đóng Menu -> không gây ra lỗi aria block nhưng ảnh hưởng PermissionCard nên chưa chỉnh
  };

  const openSidebar = () => {
    setIsSidebarOpen(true);
    setIsDropdownOpen(false); 
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };


  const handleItemSelect = () => {
    setIsDropdownOpen(false); 
  };

  const handleDoubleClick = (e: React.MouseEvent)=>{
    e.stopPropagation();
  } 

  const handleDelete = async() =>{
    await axios.patch(`https://storage-app.spsohcmut.xyz/api/v1/files/${fileID.fileID}/soft-delete`)
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
                  <button onClick={()=> {openSidebar();}}>See File Details</button>
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
            <span>Lock this file</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />


        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <PermissionCard fileId={fileID.fileID} fileName={selectedFile?.name} onCloseDropdown={closeDropdown}></PermissionCard>
        </DropdownMenuItem>


        <DropdownMenuItem onSelect={handleItemSelect} onClick={handlePreview} className="hover:cursor-pointer">
          <PanelsTopLeft/>
          <span>See preview</span>
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={handleItemSelect} onClick={handleDownload} className="hover:cursor-pointer">
          <Download/>
          <span>Download</span>
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={handleItemSelect} className="hover:cursor-pointer" onClick={handleDelete} >
          <Trash2 />
          <span>Add to Bin</span>
        </DropdownMenuItem>
        
      </DropdownMenuContent>
      <FileInfo isOpen={isSidebarOpen} fileInfo={selectedFile} onClose={closeSidebar} selectedFilePermission={selectedFilePermission} parentFolderName={parentFolderName}/>
    </DropdownMenu>
  );
}
export default DetailButton;