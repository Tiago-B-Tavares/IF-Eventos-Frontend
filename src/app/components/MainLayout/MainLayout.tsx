

import MainHeader from "../Header/Header";
import MenuBar from "../MenuBar/MenuBar";

type DashboardLayoutProps = {
    children: React.ReactNode;
};

export default function MainLayout({ children }: DashboardLayoutProps) {

 

   
    return (
        <div className="flex mainL bg-gray-300 sm:min-w-screen md:min-w-screen min-h-screen">
            <MenuBar />
            <div className="w-full px-4">
                <MainHeader />
                <main className="lg:pt-4 lg:pb-4">
                        {children}
                </main>
            </div>
        </div>
    );
}
