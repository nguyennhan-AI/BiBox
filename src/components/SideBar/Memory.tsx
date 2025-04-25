import Image from 'next/image';
import React from 'react';
import MemoryProgress from './MemoryProgress';
import PlusButton from './PlusButton';

const Memory = () => {
    return (
        <div>
            <div className='flex-col flex gap-1'>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-2'>
                        <Image src="/Sidebar/cloudicon.svg" height={24} width={24} alt='avt'></Image>
                        <div>Memory</div>
                    </div>
                    <PlusButton/>
                </div>
                <MemoryProgress></MemoryProgress>
            </div>
        </div>
    );
};

export default Memory;