
import { Button } from "@/components/ui/button"
import {
    Users
  } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import "./adjust.css"
import { ChooseButton } from "./ChooseButton"
import { useEffect, useState } from "react";
import axios from "axios";
import { EmailFinding1 } from "../EmailSearch/EmailFinding1";
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

export function PermissionCard({ fileId, fileName, onCloseDropdown }: { fileId: string, fileName: string | undefined, onCloseDropdown?: () => void }) {
  const {act,setAct} = useFileEmail();
  const {fileEmailAct,setFileEmailAct} = useFileEmail();
  const [accessFile,setAccessFile] = useState<FileInAPI[]>([])
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  useEffect(()=>{
    const fetchData = async() =>{
      try{
      const res = await axios.get(`https://storage-app.spsohcmut.xyz/api/v1/files/${fileId}/permissions`)
      const UserPermissions = res.data.data.permissions.map((user: FileInAPI) => ({
        expire_at:user.expire_at,
        file_id :user.file_id,
        permission_type : user.permission_type,
        user : user.user,
        user_id: user.user_id
      }));
      // console.log(res.data);
      setAccessFile(UserPermissions);
    }catch(error){
      console.error("error fetching",error);
    }
    }
    fetchData();
  },[fileId,act])

  const handleSubmit = async() => {
    if (fileEmailAct.length > 0){
      for (const fileEmail of fileEmailAct){
        await axios.post(`https://storage-app.spsohcmut.xyz/api/v1/files/${fileId}/permissions/add`,{
          permissions:[
            {
              "permission_type" : 1,
              "user_id" : fileEmail.id
            }
          ]
        })
      }
    }
    setAct();
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center" onClick={() => {
            if (onCloseDropdown) {
              onCloseDropdown();
            }
          }}>
            <div><Users className="w-[80%]" /></div>
          <span>Manage permission</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[620px] permissionbackground" onDoubleClick={handleDoubleClick} >
        <DialogHeader>
          <DialogTitle className="flex gap-1 p-3 text-xl">
            <div className="font-thin">Access to</div>
            <div>{fileName}</div>
            <div className="font-thin">File</div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col justify-between gap-10 items-center">
          <div className="flex items-center">
            <EmailFinding1></EmailFinding1>
          </div>
            <div className="w-[500px] h-[45px] rounded-lg border border-[#737373] items-center p-1 px-4 flex justify-between">
                {accessFile.length>0 && <div className="flex gap-2">
                    <img src="/permission/avatar.svg" alt="" />
                    <div className="flex flex-col justify-between">
                        <div className="textfont1 font-semibold flex gap-1">
                          <div>{accessFile[0].user.last_name}</div>
                          <div>{accessFile[0].user.first_name}</div> 
                        </div>
                        <div className="textfont2 ">{accessFile[0].user.email}</div>
                    </div>
                </div>}
                <div className="">
                    <div className="text-[#CB54D1] textfont2">Owner</div>
                </div>

            </div>
            <div className="w-[500px] h-[210px] rounded-lg border border-[#737373] p-1 px-4 flex flex-col gap-2">
                {accessFile.length >=1 && accessFile.slice(1).map((user,index)=>(
                  <div className="flex justify-between" key={index}>
                  <div className="flex gap-2">
                      <img src="/permission/avatar.svg" alt="" />
                      <div className="flex flex-col justify-between">
                          <div className="textfont1 font-semibold flex gap-1">
                            <div>{user.user.last_name}</div>
                            <div>{user.user.first_name}</div>
                          </div>
                          <div className="textfont2 ">{user.user.email}</div>
                      </div>
                  </div>
                  <div className="flex gap-2 items-center">
                      <div className="text-[#CB54D1] textfont2 ">Participant</div>
                      <ChooseButton User={user}  ></ChooseButton>
                  </div>
              </div>
                ))
                }
            </div>
        </div>
        <DialogFooter>
          {fileEmailAct.length >0 && <Button type="submit" onClick={()=>{setFileEmailAct([]);handleSubmit();}} >Confirm</Button>} 
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}