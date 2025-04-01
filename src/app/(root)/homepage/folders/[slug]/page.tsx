'use client'
import ListOfFile from "@/components/File/ListOfFile";
import ListOfFolder from "@/components/Folder/ListOfFolder";
import useStore from "@/components/zustand/zustandstore";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
    const [fileList,setFileList] = useState([]);
    const [folderList,setFolderList] = useState([]);
    const {act} = useStore();
  // Handle async params
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const resolvedParams = await params; // Resolve the Promise
        const { slug } = resolvedParams;
        
        const res = await axios.get(`https://storage-app.spsohcmut.xyz/api/v1/files/${slug}/sub-file`, {
          params: {
            is_folder: false,
            sort_by: "created_at",
            is_asc: true,
            offset: 0,
            limit: 10,
          }
        });
        const response = await axios.get(`https://storage-app.spsohcmut.xyz/api/v1/files/${slug}/sub-file`, {
          params: {
            is_folder: true,
            sort_by: "created_at",
            is_asc: true,
            offset: 0,
            limit: 10,
          }
        });
        console.log(res);
        console.log(response);
        const folders = response.data.data.data;
        const files = res.data.data.data;
        setFolderList(folders)
        setFileList(files);        
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };
    fetchFiles();
  }, [act,params]); 

  return (
      <div className='w-full h-full flex flex-col gap-8 mx-5 mt-5'>
      <div className="font1 w-full h-[32px] flex items-center text-center text-3xl">
        <img src="/file-icon.svg" alt="homeicon" className='h-[35px] w-[35px]' />
        All files and folders 
      </div>
      <div className='w-full'>
        <ListOfFolder folders={folderList}></ListOfFolder> 
      </div>
      <div className='w-full'>
        <ListOfFile files={fileList}></ListOfFile>
      </div>
    </div>
  );
}