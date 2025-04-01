import useBin from '@/components/zustand/useBin';
import axios from 'axios';
import React from 'react';
import "./adjust.css"
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

//

export const DeletedFileComponent = ({file}:{file:File}) => {
    const {setBinAct} = useBin();
    const handleRestore = async() =>{
        const res = await axios.patch(`https://storage-app.spsohcmut.xyz/api/v1/files/${file.id}/recover`);
        console.log(res);
        setBinAct();
    }

    const handlePermanentDeleted = async() =>{
        const res = await axios.delete(`https://storage-app.spsohcmut.xyz/api/v1/files/${file.id}/hard-delete`);
        console.log(res);
        setBinAct();
    }

    return (
        <div className='w-full h-[45px] flex items-center justify-between rounded-lg hover:bg-[#ffedd5] hover:cursor-default group '>
            <div className='flex gap-2 px-2'>
            {file.is_folder ? 
                (<img src='/bin-image/folder.jpg' alt='avt' className='w-[24px] h-[24px]'></img>)
                :
                (<img src='/bin-image/file.jpg' alt='avt' className='w-[24px] h-[24px]'></img>)
            }
            <div>{file.name}</div>
        </div>

        <div className='group-hover:hidden px-2'>{file.deleted_at}</div>

        <div className='hidden group-hover:flex  gap-2 px-3 text-[13px] py-2 font-semibold'>
            <button className='restore p-2 rounded-xl bg-[#f0d4b0]' onClick={handleRestore} >Restore</button>
            <button className='permanent p-2 rounded-xl bg-black text-white' onClick={handlePermanentDeleted}>Permanent delete</button>
        </div>
    </div>
    );
};
