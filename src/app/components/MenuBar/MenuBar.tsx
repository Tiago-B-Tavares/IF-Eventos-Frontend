import { FaAngleRight, FaHome, FaListAlt } from "react-icons/fa";
import { TiGroup } from "react-icons/ti";
import { MdAddToPhotos } from "react-icons/md";
import { GrProjects } from "react-icons/gr";
import { TbCertificate, TbHome } from "react-icons/tb";
import { MenuContexts } from "../../../contexts/MenuContexts";
import { useContext, useState } from "react";
import { useSession } from "next-auth/react";
import Link from 'next/link';
import { Menu, MenuButton, Portal, MenuList, MenuItem, Divider } from "@chakra-ui/react";
import Permissoes from "@/app/dashboard/administrador/permissions";
import { Image } from '@chakra-ui/react'
export default function MenuBar() {
    const { data: session } = useSession();
    const { open } = useContext(MenuContexts);
    const [selectedItem, setSelectedItem] = useState("dashboard");
    let IsAdmin = false;
    if (session?.user.role === "SUPER_ADMIN") {
        IsAdmin = true
    }


    return (
        <aside className={` bg-[#0c0b0b] flex justify-start flex-col  sm:overflow-hidden transition-all min-h-screen duration-200   ${open ? "w-72 p-2" : "w-0 p-0 overflow-hidden"} lg:w-72 pt-4 lg:px-4  pb-4  `}>

            <div className="mb-4 text-center flex justify-center items-center w-full h-24 ">
                <Image
                    className=" h-full w-full object-cover pb-2  border-2 border-white"
                    src="https://res.cloudinary.com/deyfr61i2/image/upload/v1738113769/imagem_2025-01-06_103243224-removebg-preview_lawk7s.png"
                    alt="Logo"
                   width={300}
                   height={300}
                />
            </div>
            <Divider />
            <ul className="mb-4 flex flex-col gap-2">
                
            <li
                    className={`text-gray-300 flex px-4 py-4 gap-4 text-md cursor-pointer  shadow-sm justify-start items-center rounded-md hover:bg-[#494949] hover:text-[#65d66a]`}
                
                >
                    <TbHome className="text-xl" />
                    <div className="flex-1 font-semibold cursor-pointer ">
                        <Link className="" href="/dashboard/">Início</Link>
                    </div>
                </li>

                {IsAdmin && (
                    <li
                        className={`text-gray-300 flex px-4 py-4 gap-4 text-md font-normal shadow-sm justify-start items-center rounded-mdhover:bg-[#494949] hover:text-[#65d66a]`}
                        onClick={() => setSelectedItem("eventos")}
                    >
                        <GrProjects className="text-md " />
                        <div className=" flex-1 font-semibold">
                            <Menu>
                                <MenuButton className="pr-4 cursor-pointer">Eventos</MenuButton>
                                <Portal>
                                    <MenuList>
                                        <MenuItem className="text-green-700  font-semibold flex gap-2">
                                            <MdAddToPhotos className="text-green-700" />
                                            <Link href="/dashboard/eventos/relatorio/eventos">Relatórios geral de Evento</Link>
                                        </MenuItem>
                                        <MenuItem className="text-green-700  font-semibold flex gap-2">
                                            <MdAddToPhotos className="text-green-700" />
                                            <Link href="/dashboard/eventos/relatorio/atividades">Relatórios geral de atividades</Link>
                                        </MenuItem>
                                        <MenuItem className="text-green-700  font-semibold flex gap-2">
                                            <FaListAlt className="text-green-700 " />
                                            <Link href="/dashboard/eventos/novo">Novo</Link>
                                        </MenuItem>
                                    </MenuList>
                                </Portal>
                            </Menu>
                        </div>
                        <FaAngleRight />
                    </li>
                )}

                <li
                    className={`text-gray-300 flex px-4 py-4 gap-4 text-md cursor-pointer  shadow-sm justify-start items-center rounded-md hover:bg-[#494949] hover:text-[#65d66a]`}
                    onClick={() => setSelectedItem("atividades")}
                >
                    <TbCertificate className="text-xl" />
                    <div className="flex-1 font-semibold cursor-pointer ">
                        <Link className="" href="/dashboard/atividades">Atividades</Link>
                    </div>
                </li>
                {IsAdmin && (
                    <li
                        className={`text-gray-300 flex px-4 py-4 gap-4 text-md cursor-pointer font-normal shadow-sm justify-start items-center rounded-md hover:bg-[#494949] hover:text-[#65d66a]`}
                        onClick={() => setSelectedItem("participantes")}
                    >
                        <TiGroup className="text-xl" />
                        <div className="flex-1 font-semibold cursor-pointer">
                            <Link href="/dashboard/participantes">Participantes</Link>
                        </div>
                    </li>)}
                {/* <li
                    className={`text-gray-300 flex px-4 py-4 gap-4 text-md cursor-pointer font-normal shadow-sm justify-start items-center rounded-md  hover:bg-[#494949] hover:text-[#65d66a]`}
                    onClick={() => setSelectedItem("certificados")}
                >
                    <TbCertificate className="text-xl" />
                    <div className="flex-1 font-semibold  cursor-pointer">
                        <Link href="/dashboard/certificados">Certificados</Link>
                    </div>
                </li> */}
                {IsAdmin && (
                    <li
                        className={`text-gray-300 flex px-4 py-4 gap-4 text-md font-normal shadow-sm justify-start items-center rounded-md hover:bg-[#494949] hover:text-[#65d66a]`}
                        onClick={() => setSelectedItem("eventos")}
                    >
                        <GrProjects className="text-md " />
                        <div className=" flex-1 font-semibold">
                            <Menu>
                                <MenuButton className="pr-4 cursor-pointer">Administração</MenuButton>
                                <Portal>
                                    <MenuList>
                                        <MenuItem className=" font-semibold flex gap-2">

                                            <Permissoes />
                                        </MenuItem>

                                    </MenuList>
                                </Portal>
                            </Menu>
                        </div>
                        <FaAngleRight />
                    </li>
                )

                }

            </ul>

        </aside>
    );
}
