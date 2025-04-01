import React from 'react';
import "./adjust.css";
import useFileEmail from '@/components/zustand/fileEmailStore';
import { User } from 'lucide-react';
interface User{
    email:string,
    image:string,
    id:string,
    permissionType : number,
    date : string
}
const EmailList1 = ({Users}:{Users : User[]}) => {
    const {setFileEmailAct} = useFileEmail();
    const handleSubmit = (user:User) =>{
        setFileEmailAct(user);
    }
    return (
        <div className='w-full h-full flex flex-col px-1 mt-2'>
            {Users.map((user,index) => (
                <div className='w-full flex gap-2 items-center textfont1 hover:cursor-pointer hover:rounded-md mb-2 hover:shadow-sm' key={index} onClick={()=>handleSubmit(user)} >
                    <User></User>
                    <span>{user.email}</span>
                </div>
            ))}
        </div>
    );
};

export default EmailList1;