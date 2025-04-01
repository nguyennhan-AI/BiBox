    import React from 'react';
    import {UserCheck} from "lucide-react";
    import { SelectTrigger } from '@radix-ui/react-select';
    import { Select, SelectContent, SelectItem, SelectValue } from '../ui/select';
    import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
    import { Button } from '../ui/button';
    import { CalendarDemo } from './CalendarDemo';
    import useEmail from '../zustand/folderEmailStore';
    const UserPermissionList = () => {
        const {emailAct} = useEmail();

        const handleValueChange = (email:string,newPermission:string) => {
            emailAct.forEach(user => {
                if (user.email === email) {
                    if(newPermission == "View"){
                        user.permissionType = 1;
                    }
                    else if(newPermission == "Edit"){
                        user.permissionType = 3;
                    }
                    else if(newPermission == "Comment"){
                        user.permissionType = 2;
                    }
                }
            });
            console.log(emailAct);
        }
        return (
            <div className='flex-col gap-2 flex'>
            {emailAct.map((user,index) => (
            <div className='w-full flex h-[40px] justify-between ' key={index}>
                <div className='flex-[6] px-3 rounded-md items-center flex border-[#799df9] border gap-2 text-sm'>
                    <UserCheck></UserCheck>
                    <div>{user.email}</div>
                </div>
                <div className='flex-[2] border mx-3 rounded-md items-center flex text-sm border-black'>
                    <Select onValueChange={(value)=>handleValueChange(user.email,value)}>
                        <SelectTrigger className='w-full'>
                            <SelectValue placeholder="choose..." >
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='View'>View</SelectItem>
                            <SelectItem value='Comment'>Comment</SelectItem>
                            <SelectItem value='Edit'>Edit</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex-[2]'>
                    <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className='text-sm border border-black' >Date</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent >
                            <CalendarDemo userEmail={user.email} userDate={user.date}/>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                {/* <div className='flex-[2]'>{user.date ? user.date.substring(0, 7) : 'No date'}</div> */}
            </div>    
            ))}        
            </div>

        );
    };

    export default UserPermissionList;