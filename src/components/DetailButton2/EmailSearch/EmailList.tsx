import React from 'react';
import { User } from "lucide-react";
import "./adjust.css";
import useEmail from '@/components/zustand/folderEmailStore';
interface User{
    email:string,
    image:string,
    id:string,
    permissionType : number,
    date : string
}
const EmailList = ({Users}:{Users : User[]}) => {
    const {setEmailAct} = useEmail();
    // const {emailAct} = useEmail()
    const handleSubmit = (user:User) =>{
        setEmailAct(user);
    }
    return (
        <div className='w-full h-full flex flex-col px-1 mt-2'>
            {/* {emailAct.length > 0 ?
            (<div className='flex w-full gap-1 items-center'>
                {emailAct.map((user,index)=>(
                    <div key={index} className='h-full w-[25px] rounded-full border border-black text-black items-center flex justify-center'>{user.image}</div>
                ))}
            </div>)
            : */}
            {/* <div className='text-gray-400 text-sm mb-2'>suggestion</div> */}
            {/* } */}
            {Users.map((user,index) => (
                <div className='w-full flex gap-2 items-center textfont1 hover:cursor-pointer hover:rounded-md mb-2 hover:shadow-sm' key={index} onClick={()=>handleSubmit(user)} >
                    <User></User>
                    <span>{user.email}</span>
                </div>
            ))}
        </div>
    );
};
export default EmailList;