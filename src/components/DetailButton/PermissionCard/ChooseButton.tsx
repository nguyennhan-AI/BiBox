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
import SelectDemo from "./SelectDemo";
import axios from "axios";
import useFileEmail from "@/components/zustand/fileEmailStore";

interface UserInAPI {
  email:string,
  first_name:string,
  last_name:string,
  image:string
}
interface FileInAPI {
  expire_at: string,
  file_id: string,
  permission_type : number,
  user: UserInAPI,
  user_id: string
}

export function ChooseButton({User}:{User:FileInAPI}) {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const {setAct} = useFileEmail();
  const handleDoubleClick = (e: React.MouseEvent)=>{
    e.stopPropagation();
  } 

  const handleDeletePermission = async() => {
    await axios.delete(`https://storage-app.spsohcmut.xyz/api/v1/files/${User.file_id}/permissions/user/${User.user_id}/delete`)
    setAct();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button onDoubleClick={handleDoubleClick}>
          <img src="/permission/button.svg" alt="" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-25 h-30" side="right">

        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer flex items-center"  onSelect={(e) => e.preventDefault()}>
          <SelectDemo selectedValue={selectedValue} onValueChange={setSelectedValue} User={User} />
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleDeletePermission} className="hover:cursor-pointer">
            <img src="/permission/removeicon.svg" alt="" />
            <span className="text-[12px]">Remove participant</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}