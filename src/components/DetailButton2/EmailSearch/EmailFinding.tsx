import { useEffect,  useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import EmailList from "./EmailList";
import useEmail from "@/components/zustand/folderEmailStore";

interface User{
    email:string,
    image:string,
    id:string,
    permissionType : number,
    date : string
}
export function EmailFinding() {
  const [input,setInput] = useState("");
  const [user, setUser] = useState<User[]>([]);
  const {emailAct} = useEmail();
  useEffect(() => {
    if(!input){setUser([]); return};
    if (input == null){
      setUser([]); return;
    }
    const fetchData = async () => {
      try {
        const res = await axios.get("https://storage-app.spsohcmut.xyz/api/v1/users/search", {
          params: {
            email: input || "com", 
            offset: 0,
            limit: 10,
          },
        });
        const usersData = res.data.data.data.map((user: User) => ({
          email: user.email,
          image: user.image,
          id:user.id
        }));
        setUser(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, [input]); 

  return (
    <div className="shadow-md md:min-w-[450px] w-[500px] mt-8 rounded-xl border-[#a0d6a2] border items-center bg-[#fffaf0] "> 
      <div className="w-full h-full px-2 py-1">
        <div className="w-full min-h-[25px] flex gap-0 items-center flex-wrap ">
        {emailAct.length >0 &&
        (
        (<div className='flex gap-1 items-center truncate'>
          {emailAct.map((user,index)=>(
              <div key={index} className='h-full w-[100px] rounded-xl border border-black text-black items-center flex justify-center gap-1 '>
                <div>{user.image}</div>
                <div className="text-sm">{user.email.substring(0,7)}...</div>
              </div>
          ))}
        </div>)
        )
        }
        <Input className="border-[#f6d4d4F] rounded-xl w-full bg-inherit m-2 " placeholder={emailAct.length > 0 ? "" : "Email"} value={input} onChange={(e) => {setInput(e.target.value);}}></Input>
        </div>
      </div>
      {/* <div className="w-full h-[1px] bg-gray-200 "></div> */}
      {user && (
        <EmailList Users={user} ></EmailList>
      )}
    </div>
  );
}


