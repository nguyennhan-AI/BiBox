import Image from 'next/image';
import React from 'react';

const methods = [
    { id: 'momo', src: '/Memory/momo-logo.png' },
    { id: 'vnpay', src: '/Memory/vnpay-logo.png' },
]
const PaymentMethodPicker = ({selected,onChange}:{selected:string,onChange : (value:string) => void}) => {
    return (
        <div className='w-full h-[90px] flex gap-14 items-center justify-center'>
            {methods.map((method)=>{
                const isSelected = method.id === selected;
                return (
                <button key={method.id} onClick={() => onChange(method.id)} >
                    <div className={`w-[90px] h-[90px] overflow-hidden transition ${isSelected ? 'p-[2px] bg-blue-200' : ''}`}>
                        <Image src={method.src} width={90} height={90} alt={`${method.id} logo`} className="object-cover w-full h-full" />
                    </div>
                </button>
                );
            })}
        </div>
    );
};

export default PaymentMethodPicker;