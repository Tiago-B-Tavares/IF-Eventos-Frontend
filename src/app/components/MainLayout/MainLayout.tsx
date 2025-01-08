"use client";

import MainHeader from "../Header/Header";
import { MenuContexts } from "../../../contexts/MenuContexts";
import { useContext, useState, useEffect } from "react";
import MenuBar from "../MenuBar/MenuBar";

type DashboardLayoutProps = {
    children: React.ReactNode;
};

export default function MainLayout({ children }: DashboardLayoutProps) {
    const { open } = useContext(MenuContexts);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
       
        const timer = setTimeout(() => {
            setLoading(false); 
        }, 1000); 

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex mainL bg-gray-300 sm:min-w-screen md:min-w-screen min-h-screen">
            <MenuBar />
            <div className="w-full px-4">
                <MainHeader />
                <main className="lg:pt-4 lg:pb-4">
                    {loading ? (
                        <div className="flex justify-center items-center min-h-[300px]">
                            {/* Spinner ou outro indicador de carregamento */}
                            <div className="spinner-border animate-spin border-t-2 border-blue-500 rounded-full w-12 h-12"></div>
                        </div>
                    ) : (
                        children
                    )}
                </main>
            </div>
        </div>
    );
}
