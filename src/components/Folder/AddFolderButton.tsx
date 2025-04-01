'use client'
import React from 'react';
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from 'axios';

const AddFolderButton = ({ setFolderFunction }) => {
  const [description,setDescription] = useState('');
  const [name,setName] = useState('');
  const [password,setPassword] = useState('');
  const handleSubmit = async() => {
    try {
      const res = await axios.post('https://storage-app.spsohcmut.xyz/api/v1/files/add',
      {
        "description": description,
        "has_password": false,
        "is_folder": true,
        "is_secure": false,
        "name": name,
        "password": password,
        "storage_detail": {
          "mime_type": '',
          "size": 0
        },
        "tags": [
        ]
      },
    );
    setFolderFunction(prev => [...prev,res.data.data]);
    }catch(error){
      console.error(error);
    }
  };
    return (
        <Dialog>
          <DialogTrigger asChild>
          <button className='w-[32px] bg-[#7DAFAF] rounded-full flex items-center justify-center ml-3 hover:bg-[#5D8F8F]'>
                <img src="/home-plus-icon.svg" alt="plus" />
          </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create new folder</DialogTitle>
            </DialogHeader> 
            <div className="flex flex-col gap-1">
              <div className='flex flex-col'>
                <div className='text-gray-800'>Description:</div>
                <input type="text" className='border border-gray-200 rounded-lg' value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
              </div>
              <div className='flex flex-col'>
                <div className='text-gray-800'>Name:</div>
                <input type="text" className='border border-gray-200 rounded-lg' value={name} onChange={(e)=>{setName(e.target.value)}}/>
              </div>
              <div className='flex flex-col'>
                <div className='text-gray-800'>Password:</div>
                <input type="text" className='border border-gray-200 rounded-lg'value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
              </div>
            </div>
            
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary" className=' border border-transparent hover:border-black rounded-md hover:shadow-md transition-all' onClick={()=>handleSubmit()}>
                  Add
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )
};

export default AddFolderButton;