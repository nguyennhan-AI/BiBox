import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListOfFile from './ListOfFile';
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

const FileList = () => {
    const [fileList,setFileList] = useState<File[]>([]);
    const {act} = useStore();
    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const res = await axios.get('https://storage-app.spsohcmut.xyz/api/v1/files/my-drive', {
                    params: {
                        is_deleted:false,
                        is_folder: false,
                        sort_by: "created_at",
                        is_asc: true,
                        offset: 0,
                        limit: 10,
                    },
                });
                const files = res.data.data.data;

                setFileList(files); 
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };
        fetchFiles();
    }, [act]);

    return (
        <div className='w-full h-full flex-col gap-5 flex'>
            <div className="font1 w-full h-[32px] flex items-center text-center text-3xl">
            <Image src="/file-icon.svg" height={35} width={35} alt='homeicon'></Image>
            Files
            </div>
            {fileList.length > 0 && 
                <div className='w-full'> 
                    <ListOfFile files={fileList}></ListOfFile>
                </div>
            }
        </div>
    );
};

export default FileList;