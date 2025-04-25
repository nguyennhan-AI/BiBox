import React from 'react';

import FileType from '../DetailButton/FileType';
import DetailButton from '../DetailButton/DetButton';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import "./Adjust.css";
import Image from 'next/image';

interface FileCardProps{
    fileId:string,
    filename:string;
    filetype:string;
    file_size:number;
    // filepreviewpicture:string;

}

const FileCard:React.FC<FileCardProps> = ({fileId,filename,filetype,file_size,/*filepreviewpicture*/})  => {
    const router = useRouter();

    const handlePreview = async() => {
        try{
          const res = await axios.get(`https://storage-app.spsohcmut.xyz/api/v1/files/${fileId}/download-url`,{
            params:{
              preview : true
            }
          });
     const url = res.data.data.url;
     router.push(url);
        }catch (error) {
          console.error("Error fetching file data:", error);
        }
      };
    return (
        <div className='w-[350px] h-[170px] border-[3px] border-[#7DAFAF] rounded-2xl shadow-md flex justify-center cursor-pointer gap-2 bg-white hover:shadow-xl transition-all select-none' onDoubleClick={handlePreview}>
            {/* preview */}
            <div className="flex justify-center items-center h-full w-[130px]"><Image src='/homepic.svg' height={120} width={120} alt='preview'></Image></div>
            <div className='flex flex-col justify-between '>
                <div className='flex-col h-[130px]'>
                    <div className='h-[30px] flex justify-end mt-1 mr-2'>
                    </div>
                    <div className='flex gap-2 items-center h-[90px]'>
                    <FileType fileName={filetype}></FileType>
                    <span className='font-semibold text-lg'>{filename}</span>
                </div>
                </div>
                <div className="flex justify-between gap-4 pb-1">
                    <div className='font-sans text-1xl items-center flex gap-1'>
                        <div>Memory:</div>
                        <div className='flex justify-between'>
                            <div>{(file_size * 0.000001).toFixed(4)}</div>
                            <div>MB</div>
                        </div>
                    </div>
                    <div className='flex gap-[2px]'>
                        <div className='w-[25px] h-[25px] flex items-center justify-center bg-[#7DAFAF] rounded-lg hover:bg-[#5D8F8F] groupFile1'>
                            <Image src="heart-icon-1.svg" height={18} width={18} alt='hearticon'></Image>
                        </div>
                        <div className='groupFile2'><DetailButton fileID = {fileId}/></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileCard;