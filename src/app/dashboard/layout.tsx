
import React from 'react';
import type { Metadata } from "next";
import MainLayout from '../components/MainLayout/MainLayout';
import MenuContextProvider from '@/contexts/MenuContexts';
import { ToastContainer } from "react-toastify";



export const metadata: Metadata = {
    title: "Dashboard"
};

type DashboardLayoutProps = {
    children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
   
    return (
        <div >
           
                <MenuContextProvider>
                    <MainLayout>
                        {children}
                    </MainLayout>
                </MenuContextProvider>
            
        </div>
    );
}
