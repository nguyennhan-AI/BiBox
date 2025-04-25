"use client";
import Header from '@/components/Header/Header';
import Sidebar from '@/components/SideBar/Sidebar';
import './PageAdjust.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className='flex min-h-screen overflow-hidden'>
            <section className='w-[400px] min-h-screen flex-none border border-t-0 border-gray-200 border-b-0 bg-[#7DAFAF] '>
                <Sidebar />
            </section>
            <section className='h-full w-full min-h-screen'>
                <div className='h-[250px] w-full'><Header /></div>
                {children}                
            </section>
        </main>
    );
};

export default Layout;
