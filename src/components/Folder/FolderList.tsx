import React, { useEffect, useState } from 'react';
import AddFolderButton from './AddFolderButton';
import axios from 'axios';
import ListOfFolder from './ListOfFolder';
import useStore from '../zustand/zustandstore';
import Image from 'next/image';

interface PermissionInFile {
    user_id : string,
    permission_type: number,
    user_image:string
}

interface File {
    created_at : string,
    deleted_at: string,
    description : string,
    id : string,
    is_deleted : boolean,
    is_folder: boolean,
    name : string,
    opened_at : string,
    owner_id : string,
    parent_folder_id : string,
    permission_type : number,
    permissions : PermissionInFile[],
    storage_detail :{
        file_size : number,
        mime_type : string,
    }
    tags : string,
    total_size : number,
    updated_at : string
}

const FolderList = () => {
    const [folderList,setFolderList] = useState<File[]>([]);
    const {act} = useStore();
    useEffect(() =>{
        const handle = async() => {
        const res = await axios.get('https://storage-app.spsohcmut.xyz/api/v1/files/my-drive',{
        params: {
            is_deleted:false,
            is_folder: true,
            sort_by: "created_at",
            is_asc: true,
            offset: 0,
            limit: 3,
        }
    }
    )
    setFolderList(res.data.data.data);
};
    handle();
    },[act])


    return (
        <div className='w-full h-full flex-col gap-5 flex'>
            <div className="font1 w-full h-[32px] flex items-center text-center text-3xl gap-1">
                <Image src="/home-folder-icon.svg" height={35} width={35} alt='homeicon'></Image>
                Folders
                <AddFolderButton setFolderFunction = {setFolderList}  />
            </div>
            <div className='w-full '> 
                <ListOfFolder folders={folderList}/>
            </div>
        </div>
    );
};

export default FolderList;
