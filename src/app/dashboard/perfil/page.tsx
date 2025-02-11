"use client";
import { Box, Button, Text, Editable, EditableInput, EditablePreview, Stack, WrapItem, Icon } from "@chakra-ui/react";
import { WarningIcon, WarningTwoIcon } from '@chakra-ui/icons'
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import bcrypt from "bcryptjs";
import UpdateUserData from "@/services/user/updateUserData";
export default function Profile() {
    const { data: session } = useSession();
    const [nome, setNome] = useState(session?.user?.name || "");
    const [email, setEmail] = useState(session?.user?.email || "");
    const [senha, setSenha] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    // Verifica se a sessão está carregando
    if (!session || session==null) {
        return <div>Carregando...</div>;
    }

    // Função para atualizar o perfil
    async function updateProfile(nome: string, email: string, senha: string) {
        if (!session) {
            console.log("Sessão não encontrada");

            return;
        }
        const hashedPassword = await bcrypt.hash(senha, 12);

        const data = {
            id: session.user.id as string,
            data: {
                nome: nome,
                email: email,
                senha: hashedPassword,
            }

        }

        try {
            await UpdateUserData(data);
            setNome(session.user.name || "");
            setEmail(session.user.email || "");
            setSenha('**********');

        } catch (error) {
            console.log(UpdateUserData);

        }
    }

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    return (
        <div className="flex flex-row items-center h-1/2 w-full gap-4 rounded-md p-4 bg-gray-100">
            <Box className="flex flex-row items-centerjustify-between w-full h-4/5  bg-white p-4 border-r-2 border-gray-300">

                <div className="p-4 w-1/2 flex justify-center items-center flex-col   rounded-lg">
                    <figure>
                    <Image src="https://res.cloudinary.com/deyfr61i2/image/upload/v1738501173/profile-img_a1jujm.png" alt="Ícone de Perfil" width={200} height={200} />

                    </figure>

                    <Stack className="w-1/2">
                        <Box className="flex flex-row items-center justify-start gap-4">
                            <span className="text-gray-500 text-lg font-semibold">Nome:</span>
                            <Editable defaultValue={nome} className="flex-1 rounded-md py-1">
                                <EditablePreview className="border-2 border-gray-300 w-full pl-2" />
                                <EditableInput onChange={(e) => setNome(e.target.value)} />
                            </Editable>
                        </Box>
                        <Box className="flex flex-row items-center justify-start gap-4" _disabled={session.user.googleId}>
                            <span className="text-gray-500 text-lg font-semibold">E-mail:</span>
                            <Editable defaultValue={email} className="flex-1 rounded-md py-1">
                                <EditablePreview className="border-2 border-gray-300 w-full pl-2" />
                                <EditableInput onChange={(e) => setEmail(e.target.value)} />
                            </Editable>
                        </Box>
                        <Box className="flex flex-row items-center justify-start gap-4">
                            <span className="text-gray-500 text-lg font-semibold">Senha:</span>
                            <Editable defaultValue={"**********"} className="flex-1 rounded-md py-1">
                                <EditablePreview className="border-2 border-gray-300 w-full pl-2" />
                                <EditableInput onChange={(e) => setSenha(e.target.value)} />
                            </Editable>
                        </Box>
                        <Box className="flex flex-row items-center justify-start gap-4">
                            <span className="text-gray-500 text-lg font-semibold">Vinculado ao Google:</span>
                            <span className="text-gray-500 text-lg font-semibold">
                                {session.user.googleId ? "Sim" : "Não"}
                            </span>
                        </Box>
                        <Box className="flex flex-row items-center justify-start gap-4">
                            <span className="text-gray-500 text-lg font-semibold">Id:</span>
                            <span className="text-gray-500 text-lg font-semibold">
                                {session.user.id}
                            </span>
                        </Box>

                        <WrapItem className="w-full flex justify-end items-center rounded-md p-4">
                            <Button
                                colorScheme="green"
                                onClick={() => updateProfile(nome, email, senha)}
                            >
                                Alterar dados
                            </Button>
                        </WrapItem>
                    </Stack>
                </div>
                <div className="border-2 border-gray-200" />
                <div className="p-4 w-1/2 flex justify-between items-center flex-col border ">
                        <WarningTwoIcon w={20} h={20} color="red.500" />
                    <span className="text-gray-500 text-3xl font-bold">Excluir conta</span>
                    <div className="flex flex-col items-center px-4 text-center gap-4">
                        <div className="flex items-center justify-center text-wrap ">
                            <span className="text-red-500 text-xl font-semibold">
                                Ao excluir sua conta, todos os seus dados  e informações permanentemente removidos.
                            </span>
                        </div>
                        <div>
                            <div className="text-red-700 text-sm font-semibold flex items-center justify-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange} // Atualiza o estado quando o checkbox é alterado
                                />
                                <span>Estou ciente de que esta ação é irreversível e não poderá ser desfeita.</span>
                            </div>

                        </div>
                    </div>
                    <Button
                        size={"lg"}
                        bgColor="red"
                        color="white"
                        disabled={!isChecked} 
                        _hover={{ bgColor: "red" }}
                        className="text-white"
                    >
                        Excluir minha conta
                    </Button>
                </div>
            </Box>

        </div>
    );
}

