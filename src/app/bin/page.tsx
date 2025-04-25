'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import axios from 'axios';
import useBin from '@/components/zustand/useBin';
import { DeletedFileComponent } from './deletedFile';
import Image from 'next/image';

// Interfaces remain the same
interface PermissionInFile {
    user_id: string;
    permission_type: number;
    user_image: string;
}

interface File {
    created_at: string;
    deleted_at: string;
    description: string;
    id: string;
    is_deleted: boolean;
    is_folder: boolean;
    name: string;
    opened_at: string;
    owner_id: string;
    parent_folder_id: string;
    permission_type: number;
    permissions: PermissionInFile[];
    storage_detail: {
        file_size: number;
        mime_type: string;
    };
    tags: string;
    total_size: number;
    updated_at: string;
}

const Page = () => {
    const router = useRouter();
    const { binAct } = useBin();
    const [deleteFile, setDeleteFile] = useState<File[]>([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('https://storage-app.spsohcmut.xyz/api/v1/files/my-drive', {
                params: {
                    is_deleted: true,
                    sort_by: "updated_at",
                    is_asc: true,
                    offset: 0,
                    limit: 10,
                },
            });
            setDeleteFile(res.data.data.data);
            setLoading(false);
        };
        fetchData();
    }, [binAct, loading]);

    return (
        <div className='bg-gray-50'>
            <div className='flex justify-between h-screen'>
                <div className='w-[7%] h-screen flex flex-col'>
                    <div className='flex-[1] flex items-center justify-center flex-col text-2xl font-semibold'>
                        <div className='mr-6'>Bi</div>
                        <div className='ml-6 text-[#7DAFAF]'>Box</div>
                    </div>
                    <div className='flex-[9] bg-[#5d9393] rounded-t-full'></div>
                </div>

                <div className='w-full h-full flex'>
                    <div className='w-[50px]'></div>
                    <div className='flex-[3]'>
                        <img src="/bin-image/bin-img.png" alt="pic" className='w-[100%] h-[70%] rounded-b-full' />
                    </div>

                    {/* Content */}
                    <div className='flex-[6] p-3 flex-col flex gap-3'>
                        <div className='w-full h-[50px] flex justify-end pr-10'>
                            <button
                                className='h-full p-5 items-center justify-center flex bg-[#2b6161] text-white rounded-l-3xl'
                                onClick={() => { router.push('/homepage'); }}
                            >
                                Back to Home
                            </button>
                        </div>
                        <div className='w-full h-[150px] flex items-center justify-between'>
                            <img src="/bin-image/frame2.jpg" alt="frame" className='h-full w-[30%]' />
                            <div className='h-full w-[40%] flex flex-col items-center justify-center'>
                                <div className='text-4xl flex'>
                                    <div className='text-[#5d9393]'>Yo</div>
                                    <div>ur</div>
                                </div>
                                <div className='text-3xl flex'>
                                    <div className='text-[#5d9393]'>Recy</div>
                                    <div>cle Bin</div>
                                </div>
                            </div>
                            <img src="/bin-image/frame1.jpg" alt="frame" className='h-full w-[30%]' />
                        </div>

                        {/* Conditional Rendering */}
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            deleteFile.length > 0 ? (
                                <>
                                    <div className='h-[20px] w-[100%] flex justify-between px-5 font-semibold'>
                                        <div className='flex gap-2'>
                                            <div>Name</div>
                                            <ArrowDown />
                                        </div>
                                        <div className='mr-5'>Deleted at</div>
                                    </div>
                                    <div className='w-full h-full px-8 flex flex-col gap-1'>
                                        <div className='w-full h-[1px] bg-gray-200'></div>
                                        {deleteFile.map((file, index) => (
                                            <div key={index}>
                                                <DeletedFileComponent file={file} />
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className='w-full h-full px-[100px] flex flex-col gap-2 items-center'>
                                    {/* <img src="/bin-image/bin-avt.png" alt="" className='bg-none h-[370px] w-[330px] mr-4'/> */}
                                    <Image src='/bin-image/bin-avt.png' height={370} width={330} alt='' className='bg-none mr-4'></Image>
                                    <div className='notify text-[#239c9c]'>Oops...seems like there is nothing in your bin</div>
                                </div>
                            )
                        )}
                    </div>
                </div>
                <div className='w-[5%] bg-[#5d9393] h-screen'></div>
            </div>
        </div>
    );
};

export default Page;