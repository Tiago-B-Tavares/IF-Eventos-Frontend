import { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Box, useToast } from "@chakra-ui/react";
import { FaPlusCircle } from "react-icons/fa";
import deleteColabEvento from "@/services/responsible/event/deleteColabEvento";
import GetColabEvento from "@/services/responsible/event/getColabEvento";
import React from "react";

interface User {
    id: string;
    nome: string;
}

export default function RemoveResponsavelEvento({ evento_id }: { evento_id: string }) {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef(null);
    const toast = useToast();

    const fetchUsers = async () => {
        try {
            const response = await GetColabEvento({ evento_id });
            if (!response) {
                console.log("Nenhum usuário encontrado.");
                return;
            }
                setUsers(response);  
           
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

            await deleteColabEvento({
                evento_id,
                organizador_id: selectedUser
            });

            toast({
                title: 'Responsável removido com sucesso!',
                status: 'success',
                duration: 5000,
                isClosable: false,
                position: "top"
            });
            onClose();
        } catch (error) {
            toast({
                title: 'Erro ao remover responsável',
                description: "Ocorreu um erro ao tentar remover o responsável.",
                status: 'warning',
                duration: 3000,
                isClosable: false,
                position: "top"
            });
            console.log("Erro: ", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <Button
                ref={btnRef}
                onClick={onOpen}
                color="red.800"
                flex="between"
                backgroundColor="red.100"
                _hover={{
                    bg: '#991b1b',
                    color: 'white'
                }}
                justifyContent="space-between"
            >
                <span className="bg-red mr-3">
                    Remover Responsável
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
                                    _hover={{ bg: "red.50" }}
                                    onClick={() => setSelectedUser(user.id)}
                                    bg={selectedUser === user.id ? "red.100" : ""}
                                >
                                    <p className="text-lg cursor-pointer">{user.nome}</p>
                                </Box>
                            ))}
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose} mr={3}>Cancelar</Button>
                        <Button
                            colorScheme="red"
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
