'use client';
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import "./adjust.css";
import { ChooseButton } from "./ChooseButton";
import { EmailFinding } from "../EmailSearch/EmailFinding";
import { useEffect, useState } from "react";
import axios from "axios";
import useEmail from "@/components/zustand/folderEmailStore";
import useCardPopup from "@/components/zustand/cardPopupStore";
import UserPermissionList from "../UserPermissionList";

interface FolderCardId {
  folderId: string | undefined;
  folderName: string | undefined
}
interface AccessUser {
  can_share: boolean;
  expire_at: string,
  file_id: string;
  permission_type: number;
  user: {
    email: string;
    first_name: string;
    image: string;
    last_name: string;
  };
  user_id: string;
}

interface User {
  email: string;
  first_name: string;
  image: string;
  last_name: string;
  permissionType:number,
  date:string,
  userId:string
}

const NewCard = ({folderId} : {folderId:string|undefined}) => {
  const {setCardShow} = useCardPopup();
  const {emailAct,setEmailAct} = useEmail();
  const {setAct} = useEmail();
  const handleBack = () => {
    setCardShow(false);
  }
  const handleSubmit = async () => {
    // Make the function async to allow 'await' inside
    for (const user of emailAct) {
      try {
        const res = await axios.post(
          `https://storage-app.spsohcmut.xyz/api/v1/files/${folderId}/permissions/add`,
          {
            permissions: [
              {
                "expire_at": user.date,
                "permission_type": user.permissionType,
                "user_id": user.id,
              },
            ],
          }
        );
        console.log(res);
        setAct();
        setEmailAct([]);
      } catch (error) {
        console.error("Error adding permission:", error);
      }
    }
    // Optionally move setCardShow(false) here if you want it after the requests complete
    setCardShow(false);
  };
  return (
    <div className="sm:max-w-[620px] bg-white rounded-lg p-4 flex-col flex gap-2">
      <h2 className="text-xl font-semibold">Permissions</h2>
      <div className="p-5">
        <UserPermissionList></UserPermissionList>
      </div>
      <div className="flex justify-end">
        <Button onClick={()=>{handleBack();handleSubmit();}} className="w-[80px]">Add</Button>
      </div>
    </div>
  );
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const PermissionCard: React.FC<FolderCardId> = ({ folderId ,folderName}) => {
  const { emailAct,setEmailAct } = useEmail();
  const [accessUser, setAccessUser] = useState<User[]>([]);
  const {cardShow, setCardShow} = useCardPopup();
  const {act} = useEmail();
  
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    setCardShow(false); 
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://storage-app.spsohcmut.xyz/api/v1/files/${folderId}/permissions`);
        const UserPermissions = res.data.data.permissions.map((user: AccessUser) => ({
          email: user.user.email,
          first_name: user.user.first_name,
          image: user.user.image,
          last_name: user.user.last_name,
          permissionType : user.permission_type,
          date:user.expire_at,
          userId:user.user_id,
        }));
        setAccessUser(UserPermissions);

      } catch (error) {
        console.error("Fetching error", error);
      }
    };
    fetchData();
  }, [folderId,setCardShow,act]);

  // Submit user và chuyển sang NewCard
  const handleSubmitUser = async () => {
    if (emailAct.length > 0) {
      try {
        setCardShow(true);
      } catch (error) {
        console.error("Error submitting user", error);
      }
    }
  };

  return (
  <Dialog onOpenChange={(open) => { if (open) setCardShow(false); setEmailAct([]) }}>
      <DialogTrigger asChild>
        <button className="flex items-center">
          <div>
            <Users className="w-[80%]" />
          </div>
          <span>Manage permission</span>
        </button>
      </DialogTrigger>
      {accessUser.length > 0 && (
        <DialogContent className="sm:max-w-[620px] permissionbackground" onDoubleClick={handleDoubleClick}>
          {cardShow ? (
            <NewCard folderId={folderId}/>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="flex gap-1 p-3 text-xl">
                  <div className="font-thin">Access to</div>
                  <div>{folderName}</div>
                  <div className="font-thin">Folder</div>
                </DialogTitle>
              </DialogHeader>
              {/* <div className="flex pb-1 pt-4 border-b border-[#E3DCDC] gap-10">
                <button>People</button>
                <button>Link</button>
              </div> */}
              <div className="flex flex-col justify-between gap-10 items-center">
                <div className="flex items-center">
                  <EmailFinding />
                </div>
                <div className="w-[500px] h-[45px] rounded-lg border border-[#737373] items-center p-1 px-4 flex justify-between">
                  <div className="flex gap-2">
                    <img src="/permission/avatar.svg" alt="" />
                    <div className="flex flex-col justify-between">
                      <div className="textfont1 font-semibold flex gap-1">
                        <div>{accessUser[0].last_name}</div>
                        <div>{accessUser[0].first_name}</div>
                      </div>
                      <div className="textfont2">{accessUser[0].email}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-[#CB54D1] textfont2">Owner</div>
                  </div>
                </div>
                {accessUser.length > 0 && (
                <div className="w-[500px] h-[150px] rounded-lg border border-[#737373] p-1 px-4 flex flex-col gap-2">
                  {accessUser.length >=1 && accessUser.slice(1).map((user,index)=>(
                    <div className="flex justify-between" key={index}>
                      <div className="flex gap-2">
                        <img src="/permission/avatar.svg" alt="" />
                        <div className="flex flex-col justify-between">
                          <div className="textfont1 font-semibold flex items-center gap-1">
                            <div>{user.last_name}</div>
                            <div>{user.first_name}</div>
                          </div>
                          <div className="textfont2">{user.email}</div>
                        </div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="text-[#CB54D1] textfont2">Participant</div>
                        <ChooseButton id={folderId} user={user} />
                      </div>
                    </div>                
                  ))}

                </div>
                )}
              </div>
              <DialogFooter>
                {emailAct.length > 0 && <Button type="submit" onClick={handleSubmitUser}>
                  Confirm
                </Button>}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      )}
    </Dialog>
  );
};

export default PermissionCard;