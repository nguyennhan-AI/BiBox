'use client'
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FolderPermissionCard } from "./FolderPermissionCard";
import axios from "axios";
import useEmail from "@/components/zustand/folderEmailStore";


interface User{
  email: string;
  first_name: string;
  image: string;
  last_name: string;
  permissionType:number,
  date:string,
  userId:string
}


export function ChooseButton({id,user}:{id:string|undefined,user:User}) {
  const [isCardOpen, setIsCardOpen] = useState(false); 
  const {setAct} = useEmail();
  const handleItemClick = () => {
    setIsCardOpen((prev) => !prev); 
  };

  const handleDeletePermission = async() =>{
    await axios.delete(`https://storage-app.spsohcmut.xyz/api/v1/files/${id}/permissions/user/${user.userId}/delete`);
    setAct();
  }

  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <button onClick={(e)=>{e.stopPropagation();}}>
          <img src="/permission/button.svg" alt="" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-25 h-30" side="right" >
        <DropdownMenuGroup >
          <DropdownMenuItem className="cursor-pointer flex items-center" onClick={handleItemClick} onSelect={(e) => e.preventDefault()}>
            <FolderPermissionCard isOpen={isCardOpen} folderId={id} user={user}></FolderPermissionCard>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer" onClick={handleDeletePermission}>
            <img src="/permission/removeicon.svg" alt="" />
            <span className="text-[12px]">Remove participant</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}