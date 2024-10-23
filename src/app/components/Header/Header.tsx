
import { MenuContexts } from "@/contexts/MenuContexts";
import { useContext } from "react";
import { FaBars, FaRegUser } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import BtnLogout from "../Logout/btnLogout";
import { Menu, MenuButton, MenuList, MenuGroup, MenuItem, MenuDivider, Avatar, WrapItem, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import Link from "next/link";
import { useSession } from "next-auth/react";


export default function MainHeader() {
    const { data } = useSession()
    const { toggle } = useContext(MenuContexts);
   
    
    return (
        <header className="mt-4 flex flex-1 max-w-screen sm:w-full sm:mb-4 md:mb-4  justify-between items-center lg:justify-end  h-16 px-5 bg-white">

            <div onClick={toggle} className="lg:hidden"><FaBars className="cursor-pointer" /></div>
            <div className="pl-2 flex lg:flex-1 font-bold opacity-60">
                teste
            </div>
            <div className="">
                <Menu>
                    <MenuButton className="text-purple-700">
                        <WrapItem>
                            <Avatar
                                name={data?.user?.name ?? "Usuário"}
                                src={data?.user?.image ?? "https://bit.ly/broken-link"}

                            />
                        </WrapItem>
                    </MenuButton>
                    <MenuList >
                        <MenuGroup >
                            <MenuItem className="text-purple-700" ><FaRegUser className="mr-3 text-purple-700" />< Link className="text-purple-700" href="/dashboard/perfil">Meu Perfil</Link></MenuItem>
                        </MenuGroup>
                        <MenuDivider />

                        <div className="pl-3 text-purple-700 flex items-center">
                            <RiLogoutBoxLine className="mr-3" />
                            <BtnLogout />
                        </div>
                    </MenuList>
                </Menu>

            </div>
        </header>
    )
}
