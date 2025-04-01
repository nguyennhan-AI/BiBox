import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import "./adjust.css"
import React, { useEffect, useState } from "react"
import  { AccordionDemo } from "./Accordition";
import axios from "axios";
import { SwitchDemo } from "@/components/DetailButton2/PermissionCard/Switchdemo";
import { ProgressDemo } from "./ProgressDemo";


interface User{
  email: string;
  first_name: string;
  image: string;
  last_name: string;
  permissionType:number,
  date:string,
  userId:string
}

interface permissionInSubFolder{
  user_id:string,
  permission_type:number,
  user_image : string
}

interface SubFolder{
  id: string,
  name:string,
  totalSize : number,
  permission: permissionInSubFolder
}

interface SubFile{
  created_at:string,
  description: string,
  id: string,
  is_folder: boolean,
  name:string,
  opened_at : string,
  owner_id : string,
  parent_folder_id: string,
  permission_type:number,
  permissions: permissionInSubFolder[],
  storage_detail:{
    file_size:number,
    mime_type:string
  }
  tag: null,
  total_size: number,
  updated_at:string
}

export function FolderPermissionCard({ isOpen: controlledIsOpen = false , folderId, user}: { isOpen?: boolean,folderId:string|undefined,user:User}) {
    const [open, setOpen] = useState(controlledIsOpen);
    const [subFolders, setSubFolders] = useState<SubFolder[]>([]);
    const [totalSize, setTotalSize] = useState(0);
    useEffect(() => {
      const handle = async() => {
        const res = axios.get(`https://storage-app.spsohcmut.xyz/api/v1/files/${folderId}/metadata`);
        // if((await res).data.data.parent_folder_id === null){
          const resp = await axios.get(`https://storage-app.spsohcmut.xyz/api/v1/files/${folderId}/sub-file`,{
            params:{
              sort_by: "created_at",
              is_asc: true,
              offset: 0,
              limit: 10,
            }
          });
          const SubFolder = resp.data.data.data.map((subFile: SubFile) => {
            // Filter permissions to only include those where user_id matches user.userId
            const filteredPermission = subFile.permissions.find(
                (perm: permissionInSubFolder) => perm.user_id === user.userId
            ) || null; 

            return {
                id: subFile.id,
                name: subFile.name,
                totalSize: subFile.total_size,
                permission: filteredPermission, 
            };
        });
          setSubFolders(SubFolder);
          setTotalSize((await res).data.data.total_size);
        // }
      }
      handle();
        setOpen(controlledIsOpen);
      }, [folderId,controlledIsOpen,user.userId]);
    

    ////////////////////////////////////////////////////////////
      const handleClick = async() => {
        setOpen(false); 
      };

      const handleDoubleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
      }
  return (
  <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex">
            <img src="/permission/showicon.svg" alt="" />
            <span  className="text-[12px]">Show all files permission</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[620px] permissionbackground" onDoubleClick={handleDoubleClick}>
        <DialogHeader>
          <DialogTitle className="flex gap-1">
            <div className="font-thin">Access of</div>
            <div>{user.email}</div>
          </DialogTitle>
        </DialogHeader>
        <div className="pt-4 p-3 px-10 flex flex-col gap-10">
          <div className="w-full h-full rounded-lg border-[2px] border-[#7FADAD]">
            <AccordionDemo id={folderId}></AccordionDemo>
          </div>

            <div className=" border-[#E3DCDC] w-full flex flex-col p-1 font-bold gap-1">
            {subFolders.length > 0 && <div className="flex items-center justify-center text-[#7FADAD]">Choose permission in this folder</div>}
            {subFolders.map((sub, index) => (
              <div key={sub.id || index} className="flex items-center justify-between">
                <div className="flex flex-[6] items-center gap-1">
                  <SwitchDemo state = {sub} ></SwitchDemo>
                  <div className="text-sm font-semibold">{sub.name}</div>
                </div>
                <div className="flex-[4] w-full"><ProgressDemo subSize={((sub.totalSize)/totalSize)*100}></ProgressDemo></div>
                </div>
              
          ))}
            </div>
        </div>

        <DialogFooter>
          {subFolders.length > 0 ? (<Button type="submit" onClick={handleClick}>Save changes</Button>) :(<Button type="submit">Close</Button>)}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}