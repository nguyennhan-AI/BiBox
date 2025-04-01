'use client';
import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import axios from 'axios';
import useFileEmail from '@/components/zustand/fileEmailStore';

interface UserInAPI {
  email: string;
  first_name: string;
  last_name: string;
  image: string;
}

interface FileInAPI {
  expire_at: string;
  file_id: string;
  permission_type: number;
  user: UserInAPI;
  user_id: string;
}

interface SelectInterface {
  selectedValue: string;
  onValueChange: (value: string) => void;
  User: FileInAPI;
}

const SelectDemo: React.FC<SelectInterface> = ({ selectedValue, onValueChange, User }) => {
  const [current, setCurrent] = React.useState(User.permission_type);
  const {act,setAct} = useFileEmail()
  console.log(User);
  const permissionMap: Record<string, number> = {
    View: 1,
    Comment: 2,
    Edit: 3
  };
  React.useEffect(()=>{
  },[act])

  const handleValueChange = async (value: string) => {
    const newPermission = permissionMap[value] || 1; 
    try {
      onValueChange(value);
      const res = await axios.patch(`https://storage-app.spsohcmut.xyz/api/v1/files/${User.file_id}/permissions/user/${User.user_id}/update`,{
        fileId : User.file_id,
        permission_type : newPermission,
        userId : User.user_id
      })
      setCurrent(newPermission);
      console.log('Update response:', res.data);
      setAct();
    } catch (error) {
      console.error('Failed to update permission:', error);
    }
  };

  const currentState = current === 1 ? "View" : current === 2 ? "Comment" : "Edit";

  return (
    <Select onValueChange={handleValueChange} value={selectedValue}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder={currentState} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="View">View</SelectItem>
          <SelectItem value="Comment">Comment</SelectItem>
          <SelectItem value="Edit">Edit</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectDemo;