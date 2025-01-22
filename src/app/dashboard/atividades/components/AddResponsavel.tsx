"use client";
import { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Box, useToast } from "@chakra-ui/react";
import getAllUsers from "@/services/user/getAllUsers";
import { User } from "@/types/interfaces";
import React from "react";

import { FaPlusCircle } from "react-icons/fa";
import CreateColabAtividade from "@/services/responsible/activity/createColabAtividade";

export default function AddResponsavel({ atividade_id }: { atividade_id: string }) {
    
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState(''); 
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    const btnRef = React.useRef(null);
    const toast = useToast()
   
    const fetchUsers = async () => {
        try {
            const userList: User[] = await getAllUsers();
            setUsers(userList);
            console.log("users", userList);
            
        } catch (error) {
            console.log("Erro ao buscar usuários: ", error);
        }
    };

   
    const adicionarResponsavelAtividade = async () => {
        try {
            if (!selectedUser) {
                console.log("Nenhum usuário selecionado.");
                return;
            }

            await CreateColabAtividade({
                atividade_id,
                organizador_id: selectedUser
            });
        
            
            toast({
                title: 'Responsável adicionado com sucesso!',
                status: 'success',
                duration: 5000,
                isClosable: false,
                position:"top"
              })
            onClose(); 
        } catch (error) {
            toast({
                title: 'Erro ao remover responsável',
                description: "We've created your account for you.",
                status: 'warning',
                duration: 3000,
                isClosable: false,
                position:"top"
              })
            console.log(" ", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <Button  ref={btnRef} onClick={onOpen} 
            color="green.700" 
             flex="between" 
             backgroundColor="green.100"
             _hover={{
                bg: '#16a34a',
                color: 'white'
            }}
            justifyContent="space-between"
            >

                <span className="bg-green mr-3">
                    Adicionar Responsável
                </span>
                <FaPlusCircle />
            </Button>

            <Modal
                onClose={onClose}
                finalFocusRef={btnRef}
                isOpen={isOpen}
                scrollBehavior="inside"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Selecione o Responsável</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div>
                            {users.map((user) => (
                                <Box
                                    key={user.id}
                                    p={2}
                                    shadow="md"
                                    borderWidth="1px"
                                    borderRadius="md"
                                    _hover={{ bg: "green.50" }}
                                    onClick={() => setSelectedUser(user.id)} 
                                    bg={selectedUser === user.id ? "green.100" : ""}
                                >
                                    <p className="text-lg cursor-pointer">{user.nome}</p>
                                </Box>
                            ))}
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose} mr={3}>Cancelar</Button>
                        <Button
                            colorScheme="green"
                            onClick={adicionarResponsavelAtividade} 
                            isDisabled={!selectedUser} 
                        >
                            Confirmar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
