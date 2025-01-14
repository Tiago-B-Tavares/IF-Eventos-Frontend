

"use client";
import React, { useState, useEffect } from "react";

import MainLayout from "../components/MainLayout/MainLayout";
import MenuContextProvider from "@/contexts/MenuContexts";


type DashboardLayoutProps = {
    children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [isLoading, setIsLoading] = useState(true);

    // Simula o carregamento
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000); // 1 segundo para simular o carregamento
        return () => clearTimeout(timer); // Cleanup do timer
    }, []);

    return (
        <div>
            <MenuContextProvider>
                <MainLayout>
                    {isLoading ? (

                        <div className="flex justify-center items-center min-h-[300px]">

                            <div className="spinner-border animate-spin border-t-2 border-green-500 rounded-full w-12 h-12"></div>
                        </div>

                    ) : (
                        children /* Renderiza os children quando terminar de carregar */
                    )}
                </MainLayout>
            </MenuContextProvider>
        </div>
    );
}
