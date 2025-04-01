'use client'
import axios from "axios";
import { useState } from "react";
interface SubFolder{
    id: string,
    name:string,
    totalSize : number,
    permission: permissionInSubFolder
}
interface permissionInSubFolder{
    user_id:string,
    permission_type:number,
    user_image : string
  }
export function SwitchDemo({state}:{state:SubFolder}) {
    const [position, setPosition] = useState(state.permission.permission_type); 

    const handleSwitchChange = async() => {
        const current = (position + 1) % 4 ;
        setPosition(current);
        state.permission.permission_type = position;
        await axios.patch(`https://storage-app.spsohcmut.xyz/api/v1/files/${state.id}/permissions/user/${state.permission.user_id}/update`,{
            fileId : state.id,
            permission_type : current,
            userId : state.permission.user_id
          })
    };

    const currentState = position === 1 ? 'View' : position === 2 ? 'Comment' : position === 3 ? 'Edit' : 'Edit';

    return (
    <div className="h-[30px] w-[70px] border rounded-2xl bg-[#7DAFAF] flex items-center justify-center">
        <button onClick={(e)=>{e.stopPropagation();handleSwitchChange();}} className="text-black hover:text-white h-full w-full text-[12px] font-semibold">{currentState}</button>
    </div>
    );
}